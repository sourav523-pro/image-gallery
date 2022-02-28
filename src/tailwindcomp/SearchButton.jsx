import { SearchIcon } from '@heroicons/react/outline'
const SearchButton = (props) => {
    const defaultClick = () => {
        //empty function
    }
    let handleClick = props.handleClick || defaultClick
    let buttonType = props.buttonType || 'submit'
    return (
        <button type={buttonType} onClick={handleClick} className="px-3 py-1.5 flex items-center justify-center mx-4 rounded-md text-white bg-indigo-500 hover:bg-indigo-400">
            <SearchIcon className='h-5 w-5 text-white font-bold' />
        </button>
    )
}

export default SearchButton