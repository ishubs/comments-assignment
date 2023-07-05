import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, Typography } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import TextareaAutosize from '@mui/base/TextareaAutosize';
import MultiSelect from './MultipleSelect';
import { Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useRef } from 'react';
const PopupComponent = ({ open, onClose, variants, setVariants }) => {

    const [loanID, setLoanID] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [variantName, setVariantName] = React.useState([]);
    const commentsContainerRef = useRef(null)
    useEffect(() => {
        // Fetch data from the API
        axios.get('https://mocki.io/v1/b0c7d7ea-5d09-4b9c-8d4b-c1b40cc39bc9')
            .then(response => {
                setLoanID(generateRandomLoanID());
                setComments(response.data?.comments);
                console.log(response.data.comments)
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        document.getElementById('comments-container')?.scrollBy(0, 80 * comments.length)
    }, [comments])

    const addComment = (e) => {
        // Add a comment
        const ObjComment = {
            id: generateRandomLoanID(),
            comment: newComment,
            updatedBy: 'John Doe',
            updatedOn: new Date(),
            taggedTo: variantName
        };
        //check if comment is empty and taggedTo is empty
        if (newComment === '' || variantName.length === 0) {
            alert("Please enter a comment and tag atleast one person")
            return;
        }
        else {
            setComments([...comments, ObjComment]);
            setNewComment('');
            e.preventDefault();
            // const lastChildElement = commentsContainerRef.current?.lastElementChild;
            // // lastChildElement?.scrollIntoView({ behavior: 'smooth' });
            // console.log(commentsContainerRef)
            // const element = 
            // document.querySelector(`#comment-${comments.length}`).scrollIntoView({ behavior: 'smooth' });
        }


    };


    const generateRandomLoanID = () => {
        return Math.floor(Math.random() * 1000000); // Generate a random number
    };

    console.log("opening")

    return (
        <Dialog open={open} onClose={onClose} >
            <DialogTitle style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

                <Typography component="div">
                    Comments ({comments.length})
                </Typography>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography className='loan-id' component="div" textAlign={'right'}>
                        Loan ID: {loanID}
                    </Typography>
                    <IconButton aria-label="close" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </DialogTitle>
            <DialogContent>
                <div id='comments-container' style={{ maxHeight: '300px', overflow: 'scroll' }}>
                    {comments.map((comment, index) => (
                        <div key={comment.id} id={`comment-${index}`} style={{ margin: '1rem 0' }}>
                            <div style={{ display: "flex", gap: '15px' }}>
                                <Avatar {...stringAvatar(comment.updatedBy)} />
                                <div>
                                    <Typography variant="subtitle2" component="div">
                                        {comment.updatedBy}
                                    </Typography>
                                    <Typography variant="body1" component="div">
                                        {comment.comment}
                                        <br></br>
                                        <div style={{ display: 'flex', gap: '10px' }}>

                                            {comment.taggedTo.map((item, index) => (
                                                <div className='loan-id' >{item}</div>
                                            ))}
                                        </div>

                                    </Typography>

                                </div>
                            </div>

                        </div>
                    ))}
                    <div ref={commentsContainerRef}></div>
                </div>
                <div className='add-comment-container' style={{ margin: '1rem 0' }}>
                    <div style={{ display: "flex", gap: '15px' }}>
                        <Avatar {...stringAvatar('John Doe')} />
                        <div style={{ flex: 1 }}>
                            <TextareaAutosize
                                style={{ width: "100%", resize: 'none' }}
                                value={newComment} onChange={(e) => setNewComment(e.target.value)} minRows={2} size="lg" variant="plain" />
                            <MultiSelect
                                variants={variants}
                                style={{ width: "100%" }}
                                id="demo-select-small"
                                className='multiselect'
                                setVariants={setVariants}
                                variantName={variantName} setVariantName={setVariantName} />
                            <div style={{ flex: 1 }}>
                                <Button variant='contained'
                                    disabled={newComment === '' || variantName.length === 0}
                                    onClick={addComment} >Save</Button>
                                <Button>Cancel</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PopupComponent;



function stringAvatar(name) {
    return {
        sx: {
            bgcolor: stringToColor(name),
        },
        children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
}


function stringToColor(string) {
    let hash = 0;
    let i;

    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }

    let color = '#';

    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */

    return color;
}
