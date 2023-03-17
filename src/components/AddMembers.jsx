import CenteredOverlayForm from './shared/CenteredOverlayForm';
import { useCallback, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { InputTags } from 'react-bootstrap-tagsinput';
import { groupMembersState } from '../state/groupMembers';
import styled from 'styled-components';
import { Form, useNavigate } from 'react-router-dom';
import { ROUTE_UTILS } from '../routes';
import { API } from 'aws-amplify';
import { useGroupData } from 'hooks/useGroupData';

const AddMembers = () => {
    const setGroupMembers = useSetRecoilState(groupMembersState);
    const [validated, setValidated] = useState(false);
    const [groupMembersString, setGroupMembersString] = useState('');
    const navigate = useNavigate();
    const { groupMembers, groupId, groupName} = useGroupData();

    const isSamsungBrowser = useCallback(() => {
        return window.navigator.userAgent.includes('SAMSUNG');
    }, []);

    const saveMembers = () => {
        API.put('groupsApi', `/groups/${groupId}/members`, {
            body: {
                members: groupMembers,
            }
        })
        .then(_response => {
            navigate(ROUTE_UTILS.EXPENSE_MAIN(groupId));
        })
        .catch(_error => {
            alert("올바르지 않은 멤버입니다.");
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setValidated(true);
        if (groupMembers.length > 0) {
            saveMembers();
        } else if (isSamsungBrowser() && groupMembersString.length > 0) {
            setGroupMembers(groupMembersString.split(','));
            saveMembers();
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
                    value={groupMembers}
                    data-testid='input-member-names'
                    placeholder='이름 간 컴마(,)로 구분'
                    onChange={(event) => setGroupMembersString(event.target.value)}
                />
            :
                <InputTags
                    value={groupMembers}
                    data-testid='input-member-names'
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