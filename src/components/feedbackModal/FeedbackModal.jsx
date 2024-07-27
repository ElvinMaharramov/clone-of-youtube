import React, { useState } from 'react';
import Modal from 'react-modal';
import emailjs from 'emailjs-com';

import './feedbackModal.scss';

const FeedbackModal = ({ isOpen, onRequestClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        subject: '',
        email: '',
        feedback: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        emailjs.send('service_6d8kf0c', 'template_ykrbdbd', formData, 'PA9fPVuleWiwfpe3h')
            .then((result) => {
                console.log('Feedback submitted:', result.text);
                setFormData({ firstName: '', lastName: '', subject: '', email: '', feedback: '' });
                onRequestClose();
            }, (error) => {
                console.error('Error submitting feedback:', error.text);
            });
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Feedback Modal"
            className="feedback-modal"
            overlayClassName="feedback-modal-overlay"
        >
            <h2>Feedback Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="box-input">
                    <div className="border">
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" className="input" required />
                    </div>
                </div>
                <div className="box-input">
                    <div className="border">
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" className="input" required />
                    </div>
                </div>
                <div className="box-input">
                    <div className="border">
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} placeholder="Subject" className="input" required />
                    </div>
                </div>
                <div className="box-input">
                    <div className="border">
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="input" required />
                    </div>
                </div>
                <div className="box-input">
                    <div className="border">
                        <textarea name="feedback" value={formData.feedback} onChange={handleChange} placeholder="Feedback" className="input" required />
                    </div>
                </div>
                <button type="submit" className="btn">Send Feedback</button>
            </form>
        </Modal>
    );
};

export default FeedbackModal;
