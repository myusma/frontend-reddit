import React, {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';
import {ReactComponent as Back} from '../../assets/back.svg';
import './Subreddit.css'



function Subreddit() {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);
    const [info, setInfo] = useState({});

    const {id} = useParams();

    useEffect(() => {

        const controller = new AbortController();

        async function fetchData() {
            setLoading(true);
            try {
                setError(false);
                const response = await axios.get(`https://www.reddit.com/r/${id}/about.json`);

                console.log(response);
                setInfo(response.data.data);

            } catch (e) {
                setError(true);

                if (axios.isCancel(e)) {
                    console.log('The axios request was cancelled')
                } else {

                    console.error(e)
                }

            }
            setLoading(false);
        }


        fetchData();

        return function cleanup() {
            controller.abort();
        }
    }, [id]);

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: Could not fetch data!</p>}

            <header className='outer-container'>
                <div className='inner-container'>

                    <nav className='nav-outer-container'>
                        <ul className='nav-inner-container'>
                            <li><Link to={'/'}> HOTTEST POSTS </Link> </li>
                            <li><a target="_blank" href='https://www.reddit.com'>REDDIT</a></li>
                            <li><a target="_blank" href='https://www.reddit.com/r/memes'>MEMES</a></li>
                        </ul>
                    </nav>

                    <h1>r/{id}</h1>
                    <h4>Subreddit specifications</h4>
                </div>
            </header>

            <div>
                <section className="outer-content-subreddit-specifications">
                    <div className="inner-content-subreddit-specifications">

                        {Object.keys(info).length > 0 && (
                            <div className="subreddit-specification-details">

                                <h3 className='h3'>Title</h3>
                                <p>{info.title}</p>
                                <h3 className='h3'>Description</h3>
                                <p>{info.public_description}</p>
                                <h3 className='h3'>Number of subscribers</h3>
                                <p>{info.subscribers}</p>
                                <div className="back-link-wrapper">
                                    <Back className="back-icon"/>
                                    <Link className='take-me-back' to="/">Take me back</Link>
                                </div>

                            </div>
                        )}
                    </div>
                </section>
            </div>

            <footer>
                <p className='footer-par'>In opdracht van Novi Hogeschool 2022</p>
            </footer>

        </>
    );
}

export default Subreddit;