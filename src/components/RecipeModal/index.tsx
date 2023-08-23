import React, { useEffect, useState } from 'react';
import { Modal, Button, Container } from 'react-bootstrap';
import { sendMessage } from 'utils/sendMessages';
import { recipe_selectors } from 'utils/common';
import 'utils/style.scss';

export type RecipeModalTypes = {
    isVisible: boolean;
};

export const RecipeModal = (props: RecipeModalTypes) => {
    const [show, setShow] = useState(false);
    const [content, setContent] = useState('<div></div>');
    const handleClose = () => setShow(false);

    const addToBlacklist = async () => {
        sendMessage({ type: 'add_to_blacklist', data: document.location.hostname });
        handleClose();
    };

    const handleEscape = (e: KeyboardEvent) => {
        if (e.code === 'Escape') {
            handleClose();
        }
    };

    const getContent = () => {
        let content: Node | undefined | null;
        recipe_selectors.forEach((e) => {
            if (document.querySelector(e)) {
                content = document.querySelector(e) ? document.querySelector(e)?.cloneNode(true) : null;
            }
        });
        return content ?? null;
    };

    useEffect(() => {
        setShow(props.isVisible);
        let newContent = getContent();
        if (newContent) {
            // @ts-ignore
            newContent = newContent.innerHTML;
        }
        // @ts-ignore
        setContent(newContent ?? '<div></div>');
        document.addEventListener('keydown', handleEscape);
    }, []);

    return (
        <Modal show={show} className={'mt-md-5 pt-md-2'}>
            <Modal.Header style={{ backgroundColor: 'lightgray' }}>
                <Container style={{ flex: 1, display: 'flex', justifyContent: 'space-between' }}>
                    <Modal.Title>Recipe Filter Redux</Modal.Title>
                    <Button variant={'outline-danger'} onClick={addToBlacklist}>
                        Disable
                    </Button>
                    <Button variant={'outline-primary'} onClick={handleClose}>
                        Close
                    </Button>
                </Container>
            </Modal.Header>
            <Modal.Body>
                <div dangerouslySetInnerHTML={{ __html: content }} style={{ padding: 0 }}></div>
            </Modal.Body>
        </Modal>
    );
};
