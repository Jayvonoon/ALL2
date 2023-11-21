import React from "react"
import { Col, Row } from "react-bootstrap"
import StoreItem from "../Page_comp/StoreItem.tsx"
import storeItems from "../data/items.json"
import Navbar from "../Page_comp/Attraction_Store_Navbar.tsx"

const Store = () => {
    return (
        <>  
            <Navbar />
            <h1></h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop:'60px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', maxWidth: '800px' }}>
                    {storeItems.map(item =>(
                        <div key={item.id} style = {{marginTop: '60px'}}>
                            <StoreItem {...item} />
                        </div>    
                    ))}
                </div>
            </div>
        </>
    )
}

//Working concept
// const Store = () => {
//     return (
//         <>  
//             <Navbar />
//             <h1></h1>
//             <div style={{ display: 'flex', justifyContent: 'space-between' }}>
//                 {storeItems.map(item =>(
//                     <div key={item.id} style={{ flex: 1, margin: '0 10px' }}>
//                         <StoreItem {...item} />
//                     </div>    
//                 ))}
//             </div>
//         </>
//     )
// }

// KT
// const Store = () =>
// {
//     return (
//         <>  
//             <Navbar />
//             <h1></h1>
//             <Row xs={1} md={2} lg={3} className= "g-3">
//                 {storeItems.map(item =>(
//                     <Col key={item.id}>
//                         <StoreItem {...item} />
//                     </Col>    
//                 ))}    
//             </Row>
//         </>
//     )
// }
export default Store;