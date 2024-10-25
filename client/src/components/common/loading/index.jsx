import { Alert, Flex, Spin } from 'antd';
const contentStyle = {
    padding: 50,
    background: 'rgba(0, 0, 0, 0.05)',
    // background:"black",
    borderRadius: 4,
    height: '100vh',
};
const content = <div style={contentStyle} />;

export const LoadingApp = ({ isLoading }) => {
    if (isLoading) {
        return (
            <div className="fixed top-0 w-full  ">
            <Flex gap="middle" vertical className='flex mt-44'>
                <Spin tip="Loading" size="large"  >
                    {content}
                </Spin>
    
            </Flex>
        </div>
        )
       
        
    }
    return null;
}
