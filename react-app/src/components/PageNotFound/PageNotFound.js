import './PageNotFound.css';

function PageNotFound() {
    return (
        <div className='pnf-page'>
            <h2 className='pnf-text'>404: Page Not Found</h2>
            <h3>Oops! This page cannot be found!</h3>
            <img className='pnf-icon' src='https://teachables.s3.us-west-1.amazonaws.com/404.png' alt="404"/>
            <a className='back-to-home-button'
                href='/'>
                Back to Home
            </a>
        </div>
    )
};

export default PageNotFound;
