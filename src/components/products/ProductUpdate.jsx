import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { categoryList } from '../../redux/category/CategorySlice'
import { productUpdate } from '../../redux/products/ProductSlice'

const ProductUpdate = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    status: false,
    description: "",
    categoryId: ""
  })
  const { id } = useParams()
  const { allCategory } = useSelector((state) => state.category)
  const { allProduct } = useSelector((state) => state.product)
  const updateProduct = allProduct.find((product) => product?._id === id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getData = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }
  let data = new FormData()
  data.append("image", formData.image)
  data.append("name", formData.name)
  data.append("description", formData.description)
  data.append("status", formData.status)
  data.append("categoryId", formData.categoryId)
  const handleSubmit = (e) => {
    e.preventDefault()
    const newData = { id: id, data: data }
    dispatch(productUpdate(newData))
    navigate('/productlist')
  }
  useEffect(() => {
    dispatch(categoryList())
  }, [])
  useEffect(() => {
    if (updateProduct) {
      setFormData({
        image: null,
        name: updateProduct.name,
        status: updateProduct.status,
        description: updateProduct.description,
        categoryId: updateProduct.categoryId
      })
    }
  }, [])
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setFormData({
        ...formData,
        image: file
      })
    }
  }
  return (
    <>
      <form className='form' onSubmit={handleSubmit} style={{
        height: "700px",
        width: " 400px",
      }}>
        <label for="image" >Image</label>
        <input type="file" onChange={handleImageChange} className="p-1" placeholder="Choose a file" name="image" />
        <label for="name">NAME</label>
        <input type="text" placeholder="Enter NAME" id="name" name='name' value={formData.name} onChange={getData} />
        <label for="name">DESCRIPTION</label>
        <input type="text" placeholder="DESCRIPTION" id="name" name='description' onChange={getData} value={formData.description} /> <br />
        <select className='form-select form-control' name='categoryId' value={formData.categoryId} onChange={getData}>
          <option className='text-dark'>Select Category</option>
          {allCategory?.map((category) => (
            <option key={category._id} value={category._id} name className='text-dark'>
              {category.name}
            </option>)
          )}
        </select> <br />
        <select className='form-control form-select' name="status" onChange={getData} id="">
          <option value="" className='text-dark'>Select Status</option>
          <option value={true} className='text-dark'>active</option>
          <option value={false} className='text-dark'>Inactive</option>
        </select>
        <button type='submit'>SAVE</button>
        <Link to='/productlist'><button className='btn' style={{ color: "white" }} >BACK</button></Link>
      </form>
    </>
  )
}
export default ProductUpdate