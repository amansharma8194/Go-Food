import React from 'react'

const Card2 = ({title, imgLink, qty, size, cost}) => {
    return (
        <div className="card bg-dark text-white border border-success border-2 p-1 col-3 m-2" style={{"width": "16rem"}}>
            <img src={imgLink} className="card-img-top" style={{"height":"10rem", "objectFit": "fill"}} />
                <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <hr />
                    <div className=''>
                    <p className='fs-6'>Qty: <span className=''>{qty}</span></p>
                    <p className='fs-6'>Size: <span className=''>{size}</span></p>
                    <p className='fs-6'>Cost: <span className=''>₹{cost}/-</span></p>
                    </div>
                </div>
        </div>
    )
}

export default Card2