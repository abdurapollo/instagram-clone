import React, {useState, useEffect} from 'react';
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts, setPosts] = useState([
    // {
    //   username: "abdurrahman",
    //   caption: "WOW It Works",
    //   imageUrl: "data:image/jpeg;base64,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"
    // },
    // {
    //   username: "nazishahmad",
    //   caption: "Dope",
    //   imageUrl: "data:image/jpeg;base64,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"
    // }
  ]);
  const [open, setOpen] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if(authUser){
          // user has logged in...
          console.log(authUser);
          setUser(authUser);
        }
        else{
          // user has logged out...
          setUser(null);
        }
    })

    return () => {
      // perform some clean up action
      unsubscribe();
    }

  }, []);

  useEffect(() => {
     db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
       //everytime a new post is added , this code fires...
       setPosts(snapshot.docs.map(docs => ({
          id: docs.id,
          post: docs.data()
        })));
     })
  }, []);

  const signUp = (event) => {
     event.preventDefault();
     auth.createUserWithEmailAndPassword(email, password)
     .then((authUser) => {
       return authUser.user.updateProfile({
         displayName: username
       })
     })
     .catch((error) => alert(error.message));

     setOpen(false);
  }
  
  const signIn = (event) => {
    event.preventDefault();
    auth
    .signInWithEmailAndPassword(email, password)
    .catch((error) => alert(error.message))

    setOpenSignIn(false);
  }

  return (
    <div className="app">
      

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
        <img 
           className="app__headerImage"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"

           alt=""
        />
        </center>
        <Input
          type = "text" 
          placeholder = "username"
          onChange = {(e) => setUsername(e.target.value)} 
        />
        <Input
          type = "text" 
          placeholder = "email"
          onChange = {(e) => setEmail(e.target.value)} 
        />
        <Input
          type = "password" 
          placeholder = "password"
          onChange = {(e) => setPassword(e.target.value)} 
        />
        <Button onClick={signUp}>Sign Up</Button>
        </form>
        
      </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
      <div style={modalStyle} className={classes.paper}>
        <form className="app__signup">
        <center>
        <img 
           className="app__headerImage"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"

           alt=""
        />
        </center>
        <Input
          type = "text" 
          placeholder = "email"
          onChange = {(e) => setEmail(e.target.value)} 
        />
        <Input
          type = "password" 
          placeholder = "password"
          onChange = {(e) => setPassword(e.target.value)} 
        />
        <Button onClick={signIn}>Sign In</Button>
        </form>
        
      </div>
      </Modal>

      <div className="app__header">
         <img 
           className="app__headerImage"
           src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"
           
           alt=""
         />

      {user ? (
        <Button onClick={() => auth.signOut()}>Logout</Button>
      ) : (
        <div className="app__loginContainer">
          <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
          <Button onClick={() => setOpen(true)}>Sign Up</Button>
        </div>
      )}
       </div>
       <div className="app__posts">
         <div className="app__postsLeft">
          {
            posts.map(({id, post}) => (
              <Post key={id} postId={id} user={user} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
            ))
          }
         </div>
         <div className="app__postsRight">
          <InstagramEmbed
            url='https://instagr.am/p/Zw9o4/'
            maxWidth={320}
            hideCaption={false}
            containerTagName='div'
            protocol=''
            injectScript
            onLoading={() => {}}
            onSuccess={() => {}}
            onAfterRender={() => {}}
            onFailure={() => {}}
          />
         </div> 
       
       </div>

      {/* <Post username="abdurrahman" caption="WOW It Works" imageUrl="data:image/jpeg;base64,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" />
      <Post username="nazishahmad" caption="Dope" imageUrl="data:image/jpeg;base64,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"/>
      <Post username="shanukhan" caption="This is afun project" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTVUMRy1rV1YCupmqKyRKylBWRswMIfV0aKUA&usqp=CAU"/> */}
     
     {
         user?.displayName ? (
          <ImageUpload username={user.displayName}/>
         ) : (
           <h3>Sorry, you need to login to upload</h3>
         )
      }
    
    </div>
  );
}

export default App;
