import CenteredOverlayForm from './shared/CenteredOverlayForm';
import { useCallback, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { InputTags } from 'react-bootstrap-tagsinput';
import { groupMembersState } from '../state/groupMembers';
import { groupNameState } from '../state/groupName';
import styled from 'styled-components';
import { Form, useNavigate } from 'react-router-dom';
import { ROUTES } from 'routes';

const AddMembers = () => {
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
    const groupName = useRecoilValue(groupNameState);
    const [validated, setValidated] = useState(false);
    const [groupMembersString, setGroupMembersString] = useState('');
    const navigate = useNavigate();

    const isSamsungBrowser = useCallback(() => {
        return window.navigator.userAgent.includes('SAMSUNG');
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
        if (groupMembers.length > 0) {
            navigate(ROUTES.EXPENSE_MAIN);
        } else if (isSamsungBrowser() && groupMembersString.length > 0) {
            setGroupMembers(groupMembersString.split(','));
            navigate(ROUTES.EXPENSE_MAIN);
        }
    };

    const header = `${groupName} 그룹에 속한 사람들의 이름을 모두 적어주세요.`
    return (
        <CenteredOverlayForm
            title={header}
            validated={validated}
            handleSubmit={handleSubmit}
        >
            {/* TODO: InputTags가 동작하지 않는 환경(삼성 브라우저)에서는 컴마(,)로 구분 */}
            { isSamsungBrowser() ?
                <Form.Control
                    data-testId='input-member-names'
                    placeholder='이름 간 컴마(,)로 구분'
                    onChange={(event) => setGroupMembersString(event.target.value)}
                />
            :
                <InputTags
                    data-testId='input-member-names'
                    placeholder='이름 간 띄어쓰기'
                    onTags={(value) => setGroupMembers(value.values)}
                />
            }
            {validated && groupMembers.length === 0 && 
                (<StyledErrorMessage>그룹 멤버들의 이름을 입력해주세요.</StyledErrorMessage>)
            }
        </CenteredOverlayForm>
    );
}

const StyledErrorMessage = styled.span`
    color: red;
`;
export default AddMembers