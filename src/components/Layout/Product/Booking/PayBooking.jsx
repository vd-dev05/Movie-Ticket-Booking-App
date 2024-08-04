import { useLocation } from 'react-router-dom';
const Pay = () => {
    const location = useLocation();
    const { item } = location.state || {};
    console.log(item);
    
    return ( 
        <div>
            {/* {item.Title} */}
        </div>
    );
}
 
export default Pay;