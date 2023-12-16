import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import "./profile.css";

const Profile = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        birthDate: '',
        phoneNumber: '',
        gender: '',
    });

    const [errors, setErrors] = useState({});

    const validateForm = (data) => {
        const errors = {};

        // Validate required fields
        ['firstName', 'lastName', 'email', 'birthDate', 'phoneNumber', 'gender'].forEach((field) => {
            if (!data[field]) {
                errors[field] = 'This field is required';
            }
        });

        // Validate email format
        const emailRegex = /^\S+@\S+\.\S+$/;
        if (data.email && !emailRegex.test(data.email)) {
            errors.email = 'Invalid email address';
        }

        return errors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear the error when the user starts typing
        setErrors({
            ...errors,
            [name]: '',
        });
    };

    const handleGenderClick = (gender) => {
        setFormData({
            ...formData,
            gender,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation
        const validationErrors = validateForm(formData);
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            console.log('Form has errors. Please fix them.');
        } else {
            // Form is valid, you can proceed with form submission or other actions
            console.log('Form submitted:', formData);
        }
    };

    return (
        <div className='prof'>
            <div className="sidebar">
                <ul>
                    <li>Order</li>
                    <li>Address</li>
                    <li> <NavLink to="/profile" style={{ textDecoration: 'none', color: '#7d7c7c' }}>Profile</NavLink></li>
                    <li><NavLink to="/wishlist" style={{ textDecoration: 'none', color: '#7d7c7c' }}>Wishlist </NavLink></li>
                    <li>Coupons</li>
                    <li>Tickets</li>
                </ul>
            </div>
            <div className="formvalidation">
                <form onSubmit={handleSubmit}>
                    <div className="names">
                        <div>
                            <label htmlFor="firstName">First Name<sup className='star'>*</sup></label> <br />
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            {errors.firstName && <span className="error">{errors.firstName}</span>}
                        </div>
                        <div>
                            <label htmlFor="lastName">Last Name<sup className='star'>*</sup></label> <br />
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            {errors.lastName && <span className="error">{errors.lastName}</span>}
                        </div>
                    </div>
                    <div className='names1'>
                        <label htmlFor="email">Email<sup className='star'>*</sup></label> <br />
                        <input
                            type="text"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                    <div className='names1'>
                        <label htmlFor="birthDate">Birth Date<sup className='star'>*</sup></label> <br />
                        <input
                            type="date"
                            id="birthDate"
                            name="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
                    </div>
                    <div className='names1'>
                        <label htmlFor="phoneNumber">Phone Number<sup className='star'>*</sup></label> <br />
                        <input
                            type="text"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                        {errors.phoneNumber && <span className="error">{errors.phoneNumber}</span>}
                    </div>
                    <div className='gen'>
                        <label>Gender<sup>*</sup></label>
                        <div>
                            <button
                                type="button"
                                onClick={() => handleGenderClick('male')}
                                className={`gender-button ${formData.gender === 'male' ? 'selected' : ''}`}
                            >
                                Male
                            </button>
                            <button
                                type="button"
                                onClick={() => handleGenderClick('female')}
                                className={`gender-button ${formData.gender === 'female' ? 'selected' : ''}`}
                            >
                                Female
                            </button>
                            <button
                                type="button"
                                onClick={() => handleGenderClick('other')}
                                className={`gender-button ${formData.gender === 'other' ? 'selected' : ''}`}
                            >
                                Other
                            </button>
                        </div>
                        {errors.gender && <span className="error">{errors.gender}</span>}
                    </div>
                    <button type="submit" className='save1'>SAVE CHANGES</button>
                </form>
            </div>
        </div>

    );
};

export default Profile;
