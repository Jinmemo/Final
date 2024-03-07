import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

export default function MemberInfoMin(props) {
	
	const {loginMember, setLoginMember, showMemberInfo, setShowMemberInfo} = props;
	const [gradeList, setGradeList] = useState([]);
	const [membership, setMembership] = useState(null);
	const [asdf, setasdf] = useState(null);


	useEffect(() => {
		let memberNo;

		axios.get("/member/grade")
		.then((data) => {
			let gList = data.data;
			
			if(loginMember) {
				let {gradeNo} = loginMember;
				let member = {
					address: loginMember.address,			addressDetail: loginMember.addressDetail,
					birthday: loginMember.birthday,		createDate: loginMember.createDate,
					email: loginMember.email,				memberId: loginMember.memberId,
					memberName: loginMember.memberName,	memberNo: loginMember.memberNo,
					memberPwd: loginMember.memberPwd,	phone: loginMember.phone,
					point: loginMember.point,				pointRate: loginMember.pointRate,
					status: loginMember.status,			zipCode: loginMember.zipCode,
					grade: gradeNo ? gList.find((grade) => grade.gradeNo === loginMember.gradeNo) : loginMember.grade
				}
				setLoginMember(member);
			}
			
			setGradeList(gList);
		}).catch((error) => {
			console.log(error);
			alert("회원등급 조회 중 에러가 발생했습니다");
		});

		if(loginMember?.memberNo) {
			axios.get("/order/membership?memberNo=" + loginMember.memberNo)
			.then((data) => {
				setMembership(data.data);
			}).catch((error) => {
				console.log(error);
				alert("회원의 멤버십을 불러오지 못했습니다");
			})
		}
	}, []);

	/**
	 * 회원의 다음 등급 안내 출력 fn
	 * @returns 회원의 다음 등급을 안내하는 태그들
	 */
	function printTargetGrade() {
		let currentGradeIndex;
		let nextGrade;

		if(gradeList) {
			currentGradeIndex = gradeList.findIndex((grade) => grade.gradeNo === loginMember?.grade?.gradeNo);
			nextGrade = currentGradeIndex === 5 || currentGradeIndex === gradeList.length - 1 ? gradeList[currentGradeIndex]?.gradeName : gradeList[currentGradeIndex + 1];
		}

		return(<>
			<h5>{nextGrade?.gradeName} 까지 [{membership?.nextGradePrice.toLocaleString()}] 원 남았습니다</h5>
		</>);
	}

	test = membership
	return(<>
		<div className="sideBarContent">
			<h2>{loginMember.memberName} 님 환영합니다 !!!</h2>
			
			<h5>현재 등급 : {loginMember?.grade?.gradeName}</h5>
			{printTargetGrade()}
			<h5>사용 가능한 쿠폰 : [{membership?.remainCouponCount}] 장</h5>
			<h5>사용 가능한 포인트 : [{loginMember.point}] 포인트</h5>
			<span style={{display: 'flex', justifyContent: 'space-evenly'}}>
				<Link to={"/buyer/mypage"} className="btn btn-secondary">마이페이지</Link>
				<Link to={"/qna/listqna"} className="btn btn-secondary">문의</Link>
			</span>
		</div>
	</>)
}