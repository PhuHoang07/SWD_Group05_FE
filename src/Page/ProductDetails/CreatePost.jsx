import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, IconButton, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import CloseIcon from '@mui/icons-material/Close';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import storage from '../../firebase/FirebaseConfig';
import axiosClient from '../../Services/axios/config';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [previewImage, setPreviewImage] = useState('');
    const [campus, setCampus] = useState('');
    const [postMode, setPostMode] = useState('');
    const [campusOptions, setCampusOptions] = useState([]);
    const [categoryOptions, setCategoryOptions] = useState([]);
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [postModes, setPostModes] = useState([]);

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
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => setPreviewImage(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const handleCancelImage = () => {
        setThumbnail(null);
        setPreviewImage('');
    };

    const handleChange = (setter) => (event) => setter(event.target.value);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            let imageUrl = '';
            if (thumbnail) {
                const storageRef = ref(storage, `images/${thumbnail.name}`);
                await uploadBytes(storageRef, thumbnail);
                imageUrl = await getDownloadURL(storageRef);
            }
    
            const postData = {
                title: title,
                description: content,
                price: price.toString(),
                campusId: campus,
                categoryId: category,
                postModeId: postMode,
                imagesUrl: [imageUrl]
            };
    
            // Validate postData fields
            const requiredFields = ['title', 'description', 'price', 'campusId', 'categoryId', 'postModeId', 'imagesUrl'];
            for (const field of requiredFields) {
                if (!postData[field]) {
                    console.error(`${field} is required.`);
                    return;
                }
            }
    
            console.log('postData:', postData);
            const response = await axiosClient.post('/api/product-post', postData);
            console.log('Post created successfully:', response.data);
        } catch (error) {
            console.error('Error creating post:', error.response?.data);
            if (error.response?.data?.errors) {
                Object.keys(error.response.data.errors).forEach((key) => {
                    console.error(`${key}: ${error.response.data.errors[key].join(', ')}`);
                });
            }
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" component="h1" gutterBottom>
                Đăng bài
            </Typography>

            <Grid container spacing={5}>
                <Grid item xs={12} sm={6}>
                    <Button variant="contained" component="label" fullWidth>
                        Upload Image
                        <input type="file" hidden onChange={handleImageChange} />
                    </Button>
                    {previewImage && (
                        <Box sx={{ position: 'relative', marginTop: '20px', marginBottom: '10px' }}>
                            <img src={previewImage} alt="preview" style={{ width: '100%' }} />
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
                                onClick={handleCancelImage}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Box>
                    )}
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
                            initialValue="<p>Nội dung bài đăng</p>"
                            apiKey="5kx813tgysajmjf9o58083ym6myi30gj2kxschnfum8kpd0a"
                            init={{
                                height: 300,
                                menubar: false,
                                plugins: [
                                    'advlist autolink lists link image charmap print preview anchor',
                                    'searchreplace visualblocks code fullscreen',
                                    'insertdatetime media table paste code help wordcount'
                                ],
                                toolbar: 'undo redo | formatselect | ' +
                                    'bold italic backcolor | alignleft aligncenter ' +
                                    'alignright alignjustify | bullist numlist outdent indent | ' +
                                    'removeformat | help',
                                content_css: '//www.tiny.cloud/css/codepen.min.css'
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
                        <Button type="submit" variant="contained" fullWidth>Đăng bài</Button>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CreatePost;
