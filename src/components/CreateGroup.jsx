import CenteredOverlayForm from './CenteredOverlayForm';
import { useState } from 'react';
import { Container, Form, Row, Button } from 'react-bootstrap';
import { useRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';
import styled from 'styled-components';

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
        <CenteredOverlayForm>
            <Container>
                <Form noValidate validated={validated} onSubmit={handleSubmit}>
                    <StyledRow>
                        <Row className='align-items-start'>
                            <StyledH2>먼저, 더치페이할 그룹의 이름을 정해볼까요?</StyledH2>
                        </Row>
                        <Row className='align-items-center'>
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
                        <Row className='align-items-end'>
                            <StyledSubmitButton type='submit'>저장</StyledSubmitButton>
                        </Row>
                    </StyledRow>
                </Form>
            </Container>
        </CenteredOverlayForm>
    );
}

const StyledH2 = styled.h2`
    font-weight: 700;
    line-height: 35px;
    text-align: right;
    overflow-wrap: break-word;
    word-break: keep-all;
`;

const StyledRow = styled(Row)`
    height: 60vh;
    justify-content: center;
    align-items: center;
`;

const StyledSubmitButton = styled(Button).attrs({
    type: 'submit'
})`
    background-color: #6610F2;
    border-radius: 8px;
    border: none;

    &:hover {
        background-color: #6610F2;
        filter: brightness(80%);
    }
`;

export default CreateGroup;