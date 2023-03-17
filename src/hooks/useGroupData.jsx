import { useEffect } from "react"
import { useParams } from "react-router-dom";
import { API } from 'aws-amplify';
import { useRecoilState } from "recoil";
import { groupNameState } from "../state/groupName";
import { groupIdState } from "../state/groupId";
import { groupMembersState } from "../state/groupMembers";
import { expensesState } from "../state/expenses";

export const useGroupData = () => {
    const { guid } = useParams();
    const [groupName, setGroupName] = useRecoilState(groupNameState);
    const [groupId, setGroupId] = useRecoilState(groupIdState);
    const [groupMembers, setGroupMembers] = useRecoilState(groupMembersState);
    const [expenses, setExpenses] = useRecoilState(expensesState);

    const fetchAndSetGroupData = () => {
        API.get('groupsApi', `/groups/${guid}`)
        .then(({data}) => {
            const { groupName, guid, members, expenses } = data;
            setGroupName(groupName);
            setGroupId(guid);
            //members array화
            setGroupMembers(members ?? []);
            setExpenses(expenses ?? []);
        })
        .catch((_error) => {
            alert('그룹 정보를 불러오는데 실패했습니다.');
        });

    };

    useEffect(() => {
        if (guid?.length > 0) {
            fetchAndSetGroupData();
        }
    }, [guid]);

    return {
        groupName,
        groupId,
        groupMembers,
        expenses
    };
}