import featImg from "../assets/img-main.jpg";
import React, {useEffect, useState} from "react";
import axios from "axios";
import LazyLoad from 'react-lazyload';
const Post = ({ id, title, body }) => (
    <div className="post">
        <LazyLoad
            once={true}
            placeholder={<img src={`https://picsum.photos/id/${id}/5/5`} alt="..." />}
        >
            <div className="post-img">
                <img src={`https://picsum.photos/id/${id}/1000/1000`} alt="..." />
            </div>
        </LazyLoad>
        <div className="post-body">
            <h4>{title}</h4>
            <p>{body}</p>
        </div>
    </div>
);

const Spinner = () => (
    <div className="post loading">
        <svg
            width="80"
            height="80"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid"
        >
            <circle
                cx="50"
                cy="50"
                fill="none"
                stroke="#49d1e0"
                strokeWidth="10"
                r="35"
                strokeDasharray="164.93361431346415 56.97787143782138"
                transform="rotate(275.845 50 50)"
            >
                <animateTransform
                    attributeName="transform"
                    type="rotate"
                    calcMode="linear"
                    values="0 50 50;360 50 50"
                    keyTimes="0;1"
                    dur="1s"
                    begin="0s"
                    repeatCount="indefinite"
                />
            </circle>
        </svg>
    </div>
);
export default function Home({ title }) {
    const [data, setdata] = useState();

    const getData = async () => {
        // await axios.get("https://jsonplaceholder.typicode.com/posts")
        await axios.get("https://6183570f91d76c00172d18d5.mockapi.io/api/test/v1/post")
            .then(res => {
                setdata(res.data);
            })
            .catch(error => console.log(error));

        // axios.get(`https://6183570f91d76c00172d18d5.mockapi.io/api/test/v1/post`)
        //     .then(res => {
        //         const persons = res.data;
        //         console.log(111, res.data)
        //     })
        //     .catch(error => console.log(error));
    }
    useEffect(() => {
        getData();
    },[])

  return (
    <div className="container">
      <img
        className="img-feat"
        src={featImg}
        alt="Red30 Tech conference attendees on a laptop"
      />

        <h2>LazyLoad Demo</h2>
        <div className="post-container">
            {data && data.map((post) => (
                <LazyLoad
                    key={post.id}
                    height={100}
                    offset={[-100, 100]}
                    placeholder={<Spinner />}
                >
                    <Post key={post.id} {...post} />
                </LazyLoad>
            ))}
        </div>
    </div>
  );
}
