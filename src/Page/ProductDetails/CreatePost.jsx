import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box, Grid, IconButton, MenuItem, FormControl, InputLabel, Select } from '@mui/material';
import { Editor } from '@tinymce/tinymce-react';
import CloseIcon from '@mui/icons-material/Close';

const CreatePost = () => {
    const [content, setContent] = useState('');
    const [price, setPrice] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [previewImage, setPreviewImage] = useState('');
    const [campus, setCampus] = useState('');

    const handleEditorChange = (content, editor) => {
        setContent(content);
    }

    const handlePriceChange = (e) => {
        const value = e.target.value;
        if (value <= 100000000) setPrice(value);
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setThumbnail(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const handleCancelImage = () => {
        setThumbnail('');
        setPreviewImage('');
    }

    const handleCampusChange = (event) => {
        setCampus(event.target.value);
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
                        <input type="file" hidden onChange={handleImageChange}/>
                    </Button>
                    {previewImage && (
                        <Box sx={{ position: 'relative', marginTop: '20px', marginBottom: '10px' }}>
                            <img src={previewImage} alt="preview" style={{ width: '100%' }}/>
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
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: 2,
                        }}
                    >
                        <TextField label="Enter Your Title" variant="outlined" fullWidth />
                        <TextField label="Enter Your Category" variant="outlined" fullWidth />
                        <TextField 
                            label="Enter Your Price" 
                            variant="outlined" 
                            fullWidth
                            value={price} 
                            onChange={handlePriceChange} 
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                        />
                        {/* Thêm phần chọn Campus */}
                        <FormControl fullWidth>
                            <InputLabel>Campus</InputLabel>
                            <Select
                                value={campus}
                                label="Campus"
                                onChange={handleCampusChange}
                            >
                                <MenuItem value={"Hồ Chí Minh"}>Hồ Chí Minh</MenuItem>
                                <MenuItem value={"Đà Nẵng"}>Đà Nẵng</MenuItem>
                                <MenuItem value={"Cần Thơ"}>Cần Thơ</MenuItem>
                                <MenuItem value={"Hà Nội"}>Hà Nội</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Editor Placeholder */}
                        <Editor
                            apiKey='5kx813tgysajmjf9o58083ym6myi30gj2kxschnfum8kpd0a'
                            initialValue="<p>This is the initial content of the editor</p>"
                            init={{
                                height: 500,
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
                            }}
                            onEditorChange={handleEditorChange}
                        />
                    </Box>
                </Grid>
            </Grid>

            {/* Di chuyển nút ĐĂNG BÀI sang phải */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', paddingTop: 2 }}>
                <Button variant="contained" color="primary">
                    ĐĂNG BÀI
                </Button>
            </Box>
        </Container>
    );
}

export default CreatePost;