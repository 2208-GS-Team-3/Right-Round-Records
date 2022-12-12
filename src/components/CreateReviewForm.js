import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setRecord } from '../store/singleRecordSlice'

const CreateReviewForm = ({selectedRecord}) => {
    const [dateReviewed, setDateReivewed] = useState("");
    const [comment, setComment] = useState("");
    const [reviewRating, setReviewRating] = useState("");


    const handleDateChange = (event) => {
        setDateReivewed(event.target.value);
    }

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    }

    const handleRatingChange = (event) => {
        setReviewRating(event.target.value);
    }

    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newReview = {
            dateReviewed,
            comment,
            reviewRating
        }

        //retrive the selectedRecord info
        const artist = selectedRecord.artist
        const year = selectedRecord.year;
        const price = selectedRecord.price;
        const genres = selectedRecord.genres;
        const styles = selectedRecord.styles;
        selectedRecord.reviews.push(newReview);//push in the new review
        const reviews = selectedRecord.reviews;

        const newRecord = {
            artist, year, price, genres, styles, reviews
        }

        //update new review on the page
        dispatch(setRecord(newRecord))
        await axios.post(`http://localhost:3000/api/records/${selectedRecord.id}`, newRecord);
        
        //fetch the updated record page with the new review updated
        const newData = await axios.get(`http://localhost:3000/api/records/${selectedRecord.id}`);
        dispatch(setRecord(newData.data));

        return (
            <div>
                <h2>Create Review</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: "column", height: "300px", width: "800px" }}>
                    <label>Date: </label>
                    <input type={"text"} value={dateReviewed} onChange={handleDateChange} />
                    <label>Review: </label>
                    <input type={"text"} value={comment} onChange={handleCommentChange} />
                    <label>Address: </label>
                    <input type={"text"} value={reviewRating} onChange={handleRatingChange} />
                
                    <button type='submit'>Submit</button>
                </form>
            </div>
        )
    }
}

    export default CreateReviewForm;