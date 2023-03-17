import CenteredOverlayForm from './shared/CenteredOverlayForm';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { groupNameState } from '../state/groupName';
import { groupIdState } from '../state/groupId';
import { useNavigate } from 'react-router-dom';
import { ROUTE_UTILS } from '../routes';
import { API } from 'aws-amplify';

const CreateGroup = () => {
    const [validated, setValidated] = useState(false);
    const [validGroupName, setValidGroupName] = useState(false);
    const [groupName, setGroupName] = useRecoilState(groupNameState);
    const setGroupId = useSetRecoilState(groupIdState);
    const navigate = useNavigate();

    const saveGroupName = () => {
        API.post('groupsApi', '/groups', {
            body: {
                groupName,
            }
        })
        .then(response => {
            const { guid } = response.data;
            setGroupId(guid);
            navigate(ROUTE_UTILS.ADD_MEMBERS(guid));
        })
        .catch(({ response }) => {
            alert("올바르지 않은 그룹명입니다.");
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.stopPropagation();
            setValidGroupName(false);
        } else {
            setValidGroupName(true);
            saveGroupName();
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