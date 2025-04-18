import React from 'react'
import {Container,Image} from 'react-bootstrap'
import {Link} from 'react-router-dom'
// img
import error404 from '@/assets/images/error/404.png'

import { useRouteError } from "react-router-dom";



 const Error404 = () => {
    const error = useRouteError();
    console.error(error);
    return (
        <>
            <div className="gradient">
                <Container>
                    <Image src={error404} className="img-fluid mb-4 w-50" alt=""/> 
                    <h2 className="mb-0 mt-4 text-white">Oops! This Page is Not Found.</h2>
                    <p className="mt-2 text-white">The requested page dose not exist.</p>
                    <p><i>{error?.statusText || error?.message}</i></p>

                    <Link className="btn bg-white text-primary d-inline-flex align-items-center" to="/">Back to Home</Link>
                </Container>
                <div className="box">
                    <div className="c xl-circle">
                        <div className="c lg-circle">
                            <div className="c md-circle">
                                <div className="c sm-circle">
                                    <div className="c xs-circle">                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
            </div>
        </>
    )
}

export default Error404;
