import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5555/allurls");
        setUrls(response.data);
      } catch (error) {
        console.error("Error Fetching Data ", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formUrl = event.target.url.value;

    try {
      await axios.post(
        "http://localhost:5555/url",
        { url: formUrl },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // After successful submission, fetch updated data
      const response = await axios.get("http://localhost:5555/allurls");
      setUrls(response.data);

      console.log("URL Shortened Successfully!");
    } catch (error) {
      console.error("Error Shortening URL", error);
    }
  };

  return (
    <div>
      <h1 className="bg-pink-200 text-center text-6xl rounded-2xl">
        URL SHORTENER
      </h1>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="url">Enter your Original URL</label>
          <input
            className="border border-black"
            type="text"
            placeholder="https://example.com"
            name="url"
            required={true}
          />
          <button type="submit">Short Now</button>
        </form>
      </div>
      <div>
        <table className=" gap-5">
          <thead>
            <th>No</th>
            <th>Short ID</th>
            <th>Redirect To</th>
            <th>Click</th>
          </thead>
          {urls.map((url, index) => (
            <tbody key={index}>
              <tr>
                <td> {index + 1}</td>
                <td>{url.shortId}</td>
                <td>{url.redirectURL}</td>
                <td>{url.visitHistory.length}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  );
};

export default App;
