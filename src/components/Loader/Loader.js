import { Oval } from 'react-loader-spinner';

const Loader = () => {
    return (
        <div className='loaderWrap'>
            <Oval color="#3f51b5" secondaryColor="#bdbebd" height={60} width={60} />
        </div>
    );
};

export default Loader;