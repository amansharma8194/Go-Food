import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Slider from '../components/Slider'

const Home = () => {
  const [catData, setCatData] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [query, setQuery] = useState("");


  const loadFoodData = async () => {
    const resp = await fetch("http://localhost:3000/api/foodData", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const foodData = await resp.json();
    setCatData(foodData[0]);
    setFoodItems(foodData[1]);
  };

  const searchQuery = (e)=>{
    e.preventDefault();
    setQuery(e.target.searchInput.value);
  }

  useEffect(() => {
    loadFoodData();
  }, []);


  return (
    <>
      <Navbar />


      <div>
        <div>
          <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" >
            <div className="carousel-inner" id='slider'>
              <div className="carousel-caption d-none d-md-block" style={{ "zIndex": '10' }}>
                <form className="d-flex" role="search" onSubmit={searchQuery}>
                  <input
                   className="form-control me-2"
                  type="search" placeholder="Search" 
                  aria-label="Search" name='searchInput' 
                  onChange={(e)=>setQuery(e.target.value)}
                  />
                  <button className="btn btn-outline-light" type="submit">Search</button>
                </form>
              </div>
              <div className="carousel-item active">
                <img src="https://source.unsplash.com/random/900x700/?food" className="d-block w-100" alt="..." style={{ "filter": "brightness(30%)", "objectFit": "fill" }} />
              </div>
              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?food" className="d-block w-100" alt="..." style={{ "filter": "brightness(30%)", "objectFit": "fill" }} />
              </div>
              <div className="carousel-item">
                <img src="https://source.unsplash.com/random/900x700/?food" className="d-block w-100" alt="..." style={{ "filter": "brightness(30%)", "objectFit": "fill" }} />
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>


      <div className='container'>
        {
          catData.length > 0 ?
            catData.map(data => (
              <div key={data._id} className='row mt-3'>
                <h3 className='fs-3'>{data.CategoryName}</h3>
                <hr />
                {
                  foodItems.length > 0 ?
                    foodItems.filter(item => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(query.toLowerCase())))
                      .map(filterdItem => (
                        <div className='col-12 col-md-5 col-lg-3 m-4' key={filterdItem._id}>
                          <Card
                            data = {filterdItem}
                          />
                        </div>

                      )) :
                    <div>No Items found in the Category.</div>
                }
              </div>
            )) :
            <div>No Category Found. </div>

        }
      </div>
      <Footer />
    </>
  )
}

export default Home