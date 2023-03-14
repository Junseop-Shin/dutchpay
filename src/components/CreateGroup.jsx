import CenteredOverlayForm from './CenteredOverlayForm';
import { useState } from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';

const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const [validGroupName, setValidGroupName] = useState(false);
    const [groupName, setGroupName] = useRecoilState(groupNameState);
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidGroupName(false);
        } else {
            setValidGroupName(true);
        }
        setValidated(true);
    }
    return (
        <div>
            <h1>Dutch Pay</h1>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <Row>
                        <h2>먼저, 더치페이할 그룹의 이름을 정해볼까요?</h2>
                    </Row>
                    <Row>
                        <Form.Group controlId='validationGroupName'>
                            <Form.Control 
                                type='text'
                                required
                                placeholder='2022 제주도 여행'
                                onChange={(e) => setGroupName(e.target.value)}
                            />
                            <Form.Control.Feedback 
                                type='invalid'
                                data-valid={validGroupName}
                            >
                                그룹명을 입력해주세요.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Row>
                        <Button type='submit'>저장</Button>
                    </Row>
                </Form>
            </Container>
            {/* <CenteredOverlayForm /> */}
        </div>
    );
}

export default CreateGroup;