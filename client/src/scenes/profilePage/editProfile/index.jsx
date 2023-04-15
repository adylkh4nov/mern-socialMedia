import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import styles from './EditProfile.module.scss';
import {Box, Button, TextField, Typography, useMediaQuery, useTheme} from "@mui/material";
import FlexBetween from "../../../components/FlexBetween";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import {useDispatch, useSelector} from "react-redux";
import Dropzone from "react-dropzone";
import {Field, Form, Formik} from "formik";
import {setFriends} from "../../../state";

const EditProfile = () => {
    const {_id} = useSelector((state) => state.user);
    const token = useSelector((state) => state.token)
    const {palette} = useTheme();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width:600px)");
    const [user, setUser] = useState('')
    const theme = useTheme();

    const getUser = async () => {
        const response = await fetch(
            `http://localhost:3001/users/${_id}/`,
            {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        )
        const data = await response.json();
        setUser(data)

    };
    useEffect(() => {
        getUser()
    }, [])
    if (!user) return null
    const initialValues = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        picturePath: user.picturePath
    };

    const handleSubmit = async (values) => {
        console.log(JSON.stringify(values))
        await fetch(`http://localhost:3001/users/update/${_id}`, {
            method: "PUT",
            headers: {Authorization: `Bearer ${token}`,},
            body: JSON.stringify(values),
        }).then(() => navigate(`/profile/${_id}`))
    };
    return (
        <div className={styles.form}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
                {(
                    {
                        values,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                    }) => (
                    <Form>
                        <Box
                            marginTop="20%"
                            display="grid"
                            gap="30px"
                            gridTemplateColumns="1fr"
                            width="100%"
                            backgroundColor={theme.palette.background.alt}
                            p="1rem 6%"
                            textAlign="center"
                            sx={{
                                "& > div": {gridColumn: isNonMobile ? undefined : "span 4"},
                            }}>
                            <Field
                                name="firstName"
                                as={TextField}
                                label="First name"
                                value={values.firstName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Field
                                name="lastName"
                                as={TextField}
                                label="Last name"
                                value={values.lastName}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Field
                                name="email"
                                as={TextField}
                                label="Email"
                                value={values.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            <Box
                                gridColumn="span 4"
                                border={`1px solid ${palette.neutral.medium}`}
                                borderRadius="5px"
                                p="1rem"
                            >
                                <Dropzone
                                    acceptedFiles=".jpg,.jpeg,.png"
                                    multiple={false}
                                    onDrop={(acceptedFiles) =>
                                        setFieldValue("picturePath", acceptedFiles[0])
                                    }
                                >
                                    {({getRootProps, getInputProps}) => (
                                        <Box
                                            {...getRootProps()}
                                            border={`2px dashed ${palette.primary.main}`}
                                            p="1rem"
                                            sx={{"&:hover": {cursor: "pointer"}}}
                                        >
                                            <input {...getInputProps()} />

                                            <FlexBetween>
                                                <Typography>{values.picturePath}</Typography>
                                                <EditOutlinedIcon/>
                                            </FlexBetween>

                                        </Box>
                                    )}
                                </Dropzone>
                            </Box>
                            <FlexBetween>
                                <Button
                                    type="submit"
                                >Change</Button>
                                <Button onClick={()=>navigate(`/profile/${_id}`)}>Back</Button>
                            </FlexBetween>

                        </Box>

                    </Form>
                )}
            </Formik>
        </div>
    )
};

export default EditProfile;
