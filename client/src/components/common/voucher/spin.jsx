import React, { useState } from 'react';

const SpinWheel = () => {
    const [spinning, setSpinning] = useState(false);
    const [result, setResult] = useState(null);

    const prizes = [
        'Giải nhất - 1000 VND',
        'Giải nhì - 500 VND',
        'Giải ba - 200 VND',
        'Giải khuyến khích - 50 VND',
        'Không có giải thưởng'
    ];

    // Hàm xử lý quay vòng quay
    const startSpin = () => {
        setSpinning(true);

        // Mô phỏng quay vòng quay
        setTimeout(() => {
            const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
            setResult(randomPrize);
            setSpinning(false);
        }, 3000); // Quay trong 3 giây
    };

    return (
        <div className='fixed top-auto right-auto z-50'>
            <div
                style={{
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    border: '10px solid #ddd',
                    position: 'relative',
                    overflow: 'hidden',
                    margin: '0 auto',
                    transform: spinning ? 'rotate(720deg)' : 'rotate(0deg)',
                    transition: 'transform 3s ease-out'
                }}
            >
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        fontSize: '20px',
                        fontWeight: 'bold',
                        color: '#000'
                    }}
                >
                    {/* {spinning ? 'Đang quay...' : result || 'Bấm để quay!'}   */}
                </div>
            </div>

            <button
                onClick={startSpin}
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#28a745',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    marginTop: '20px'
                }}
                disabled={spinning}
            >
                {spinning ? 'Đang quay...' : 'Quay ngay'}
            </button>
        </div>
    );
};

export default SpinWheel;
