import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, IconButton, MenuItem, FormControl, InputLabel, Select, Modal } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import CloseIcon from '@mui/icons-material/Close';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase/FirebaseConfig';
import axiosClient from '../../Services/axios/config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnails, setThumbnails] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [campus, setCampus] = useState('');
    const [postMode, setPostMode] = useState('');
    const [campusOptions, setCampusOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [postModes, setPostModes] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [campusResponse, postModesResponse, categoryResponse] = await Promise.all([
                    axiosClient.get('/api/campus/view-all'),
                    axiosClient.get('/api/post-mode/view/active'),
                    axiosClient.get('/api/category/view-all')
                ]);
                setCampusOptions(campusResponse.data);
                setPostModes(postModesResponse.data);
                setCategoryOptions(categoryResponse.data);
            } catch (error) {
                console.error('Error fetching options:', error);
            }
        };
        fetchOptions();
    }, []);

    const handleEditorChange = (content) => setContent(content);

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (value <= 100000000) setPrice(value);
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setThumbnails([...thumbnails, ...files]);

        const previewUrls = files.map(file => URL.createObjectURL(file));
        setPreviewImages([...previewImages, ...previewUrls]);
    };

    const handleCancelImage = (index) => {
        setThumbnails(thumbnails.filter((_, i) => i !== index));
        setPreviewImages(previewImages.filter((_, i) => i !== index));
    };

    const handleChange = (setter) => (event) => setter(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const imageUrls = await Promise.all(thumbnails.map(async (thumbnail) => {
                const storageRef = ref(storage, `images/${thumbnail.name}`);
                await uploadBytes(storageRef, thumbnail);
                return await getDownloadURL(storageRef);
            }));

            const postData = {
                title: title,
                description: content,
                price: price.toString(),
                campusId: campus,
                categoryId: category,
                postModeId: postMode,
                imagesUrl: imageUrls
            };

            // Validate postData fields
            const requiredFields = ['title', 'description', 'price', 'campusId', 'categoryId', 'postModeId', 'imagesUrl'];
            for (const field of requiredFields) {
                if (!postData[field]) {
                    toast.error(`${field} is required.`);
                    return;
                }
            }

            console.log('postData:', postData);
            const response = await axiosClient.post('/api/product-post', postData);
            console.log('Post created successfully:', response.data);
            localStorage.setItem('postSuccess', true);
            navigate('/user-profile');
        } catch (error) {
            console.error('Error creating post:', error.response?.data);
            if (error.response?.data?.message.includes('You dont have enough coin')) {
                setErrorMessage(error.response.data.message);
                setIsModalVisible(true);
            }
            if (error.response?.data?.errors) {
                Object.keys(error.response.data.errors).forEach((key) => {
                    console.error(`${key}: ${error.response.data.errors[key].join(', ')}`);
                });
            }
        }
    };

    const handleModalClose = () => {
        setIsModalVisible(false);
    };

    const handleRecharge = () => {
        window.location.href = '/package-postmode';
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Đăng bài
            </Typography>

            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" component="label" fullWidth>
                        Upload Images
                        <input type="file" hidden multiple onChange={handleImageChange} />
                    </Button>
                    {previewImages.map((previewImage, index) => (
                        <Box key={index} sx={{ position: 'relative', marginTop: '20px', marginBottom: '10px' }}>
                            <img src={previewImage} alt={`preview ${index}`} style={{ width: '100%' }} />
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    color: 'primary.main',
                                    backgroundColor: 'background.paper',
                                    '&:hover': {
                                        backgroundColor: 'background.default',
                                    },
                                }}
                                onClick={() => handleCancelImage(index)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    ))}
                </Grid>

                <Grid item xs={12} sm={6}>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                        onSubmit={handleSubmit}
                    >
                        <TextField
                            label="Nhập tiêu đề"
                            variant="outlined"
                            fullWidth
                            required
                            value={title}
                            onChange={handleChange(setTitle)}
                        />
                        <FormControl fullWidth required>
                            <InputLabel>Thể loại</InputLabel>
                            <Select
                                value={category}
                                onChange={handleChange(setCategory)}
                                fullWidth
                                required
                                label="Thể loại"
                            >
                                {categoryOptions.map(option => (
                                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            label="Nhập giá"
                            variant="outlined"
                            fullWidth
                            value={price || ''}
                            onChange={handlePriceChange}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                            required
                        />
                        <FormControl fullWidth required>
                            <InputLabel>Cơ sở</InputLabel>
                            <Select value={campus || ''} label="Cơ sở" onChange={handleChange(setCampus)}>
                                {campusOptions.map(option => (
                                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Editor
                            initialValue=""
                            apiKey="5kx813tgysajmjf9o58083ym6myi30gj2kxschnfum8kpd0a"
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: 'advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code help wordcount',
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_css: '//www.tiny.cloud/css/codepen.min.css',
                                forced_root_block: false,
                                setup: editor => {
                                    editor.on('change', () => {
                                        const content = editor.getContent({ format: 'text' });
                                        setContent(content);
                                    });
                                }
                            }}
                            onEditorChange={handleEditorChange}
                        />
                        <FormControl fullWidth required>
                            <InputLabel>Chế độ đăng bài</InputLabel>
                            <Select value={postMode || ''} label="Chế độ đăng bài" onChange={handleChange(setPostMode)}>
                                {postModes.map(mode => (
                                    <MenuItem key={mode.id} value={mode.id}>{mode.type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <Button type="submit" variant="contained" color="primary">
                            Đăng bài
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Modal open={isModalVisible} onClose={handleModalClose}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                    }}
                >
                    <Typography variant="h6" component="h2">
                        {errorMessage}
                    </Typography>
                    <Box sx={{ mt: 2 }}>
                        <Button variant="contained" color="primary" onClick={handleRecharge}>
                            Nạp tiền
                        </Button>
                        <Button variant="contained" color="secondary" onClick={handleModalClose} sx={{ ml: 2 }}>
                            Đóng
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </Container>
    );
};

export default CreatePost;
