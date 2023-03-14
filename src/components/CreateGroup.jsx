import CenteredOverlayForm from './CenteredOverlayForm';
import { useState } from 'react';
import { Form  } from 'react-bootstrap';
import { useSetRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';

const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const [validGroupName, setValidGroupName] = useState(false);
    const setGroupName = useSetRecoilState(groupNameState);
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
        <CenteredOverlayForm
            title='먼저, 더치페이할 그룹의 이름을 정해볼까요?'
            validated={validated}
            handleSubmit={handleSubmit}
        >
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
        </CenteredOverlayForm>
    );
}

export default CreateGroup;