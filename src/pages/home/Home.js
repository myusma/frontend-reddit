import React, {useEffect, useState} from 'react';
import axios from "axios";
import reddit from '../../assets/logo.png'
import './Home.css'
import {Link} from "react-router-dom";
import Header from "../../components/header/Header";
import {truncate} from "../../helpers/HelperFunctie";



const Home = () => {


    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);


    useEffect(() => {

        const controller = new AbortController();

        async function fetchData() {
            setLoading(true);
            try {
                setError(false);
                const respons = await axios.get('https://www.reddit.com/hot.json?limit=15')
                setPosts(respons.data.data.children)
                console.log(respons.data.data.children)

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


        fetchData()

        return function cleanup() {
            controller.abort();
        }
    }, [])

    return (
        <>
            {loading && <p>Loading...</p>}
            {error && <p>Error: Could not fetch data!</p>}

{/*<Header*/}
{/*    headerClassName='outer-container'*/}
{/*    divClassName='inner-container'*/}
{/*    outerClassName='nav-outer-container'*/}
{/*    innerClassName='nav-inner-container'*/}
{/*    to={'/'}*/}
{/*    nameOne='HOTTEST POSTS'*/}
{/*    target='_blank'*/}
{/*    href='https://www.reddit.com'*/}
{/*    nameTwo='REDDIT'*/}
{/*    hrefTwo='https://www.reddit.com/r/meme'*/}
{/*    nameThree='MEMES'*/}
{/*    imgClassName='logo'*/}
{/*    src={reddit}*/}
{/*    alt='logo'*/}
{/*    name='Reddit'*/}
{/*/>*/}

            <header className='outer-container'>
                <div className='inner-container'>

                    <nav className='nav-outer-container'>
                        <ul className='nav-inner-container'>
                            <li><Link to={'/'}> HOTTEST POSTS </Link> </li>
                            <li><a target="_blank" href='https://www.reddit.com'>REDDIT</a></li>
                            <li><a target="_blank" href='https://www.reddit.com/r/meme'>MEMES</a></li>
                        </ul>
                    </nav>

                    <img className='logo' src={reddit} alt='logo'/>
                    <h1>Reddit</h1>
                </div>
            </header>


            <div className='outer-container-main'>
                <h2>Hottest posts</h2>
                <h4>on Reddit now</h4>

                <div className='article-container'>

                    {posts.map((reddit) => {
                        return (
                            <article key={reddit.data.id}>

                                <h3><a target="_blank" href={`https://www.reddit.com${reddit.data.permalink}`}>{truncate(reddit.data.title)} </a></h3>

                                <div>
                                    <p><Link className='paragraaf' to={`/subreddit/${reddit.data.subreddit}`}>{reddit.data.subreddit_name_prefixed}</Link></p>
                                    <p>{reddit.data.num_comments} - Ups: {reddit.data.ups}</p>
                                </div>

                            </article>
                        )
                    })}
                </div>

            </div>


            <footer>
                <p className='footer-par'>In opdracht van Novi Hogeschool 2022</p>
            </footer>



        </>

    );
}

export default Home;