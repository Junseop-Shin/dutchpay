import { Button } from "react-bootstrap";
import { ShareFill } from "react-bootstrap-icons";
import styled from "styled-components";

export const ShareButton = () => {
    const handleSharing = () => {
        // 모바일, 데스크톱 구분
        if (navigator.userAgent.match(/iphone|android/i) && navigator.share) {
            navigator.share({
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(window.location.href)
            .then(() => {
                alert("공유 링크가 클립보드에 복사되었습니다. 그룹 멤버들과 공유해보세요!");
            });
        }
    }

    return (
        <StyledShareButton data-testid='share-btn' onClick={handleSharing}>
            <ShareFill />
        </StyledShareButton>
    );
}

const StyledShareButton = styled(Button)`
    border-radius: 50%;
    background-color: #6B3DA6;
    border: none;

    position: fixed;
    width: 55px;
    height: 55px;
    right: 40px;
    bottom: 30px;

    filter: drop-shadow(4px 4px 6px rgba(0, 0, 0, 0.25));
    &:hover, &:active {
        background-color: #59359A;
    }

    color: white;
    font-size: 30px;
    text-align: center;
    line-height: 1px;
`;