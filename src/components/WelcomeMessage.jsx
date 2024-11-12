const WelcomeMessage = ({ addInitialChstList }) => {
  return(
  <center className="welcome-message">
    <h1>There is no Posts...</h1>
    <button type="button" className="btn btn-primary" onClick={addInitialPostList}>Get Post From Server</button>
  </center>
  
);
}
export default WelcomeMessage;