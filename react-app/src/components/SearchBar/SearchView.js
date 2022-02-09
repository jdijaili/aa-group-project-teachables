import './SearchView.css'

const SearchBar = () => {
    return(
        <>
            <form action='' method='GET'>
                <input
                    type='text'
                    placeholder="Let's make..."
                    className='search-bar'
                />
                <button type='submit'>
                    <img src='https://res.cloudinary.com/jenn/image/upload/v1644450194/teachables/magnifier_dzmddk.png' alt='Search icon' className='search-button'/>
                </button>
            </form>
        </>
    )
};

export default SearchBar;
