import React, { useState, useEffect } from 'react';
import { AddressData } from 'react-daum-postcode';
import "../../css/member/SignUp.css";
import DaumPost from '../common/DaumPost';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Button, Modal} from 'react-bootstrap';
import { isFor } from '@babel/types';

const SignUp = () => {

    // 회원가입상태값 선언
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [confirm, setConfirm] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [addressDetail, setAddressDetail] = useState('');
    const [zipCode, setzipCode] = useState('');

    
    // 리다이렉트 문구
    const navigate = useNavigate();

    // DAUM API
    const [modalState, setModalState] = useState(false);
    const [address, setInputAddressValue] = useState('');
    const [inputZipCodeValue, setInputZipCodeValue] = useState('');
    


    const handleModalOpen = () => {
        setModalState(true);
    };

    const handleModalClose = () => {
        setModalState(false);
    }


    // 다음 주소창 열리게 하기
    const toggleModal = () => {
        setModalState(!modalState);
    };
    const onCompletePost = (data: AddressData) => {    
        setModalState(false);    
        setInputAddressValue(data.address);
        setInputZipCodeValue(data.zonecode);
    };
    
    const [isIdCheck, setIsIdCheck] = useState(false);
    const [isIdAvailable, setIsIdAvailable] = useState(false);
    const [isIdValid, setIsIdValid] = useState(false);
    const [isIdCheckClicked, setIsIdCheckClicked] = useState(false);
    const [isNameValid, setIsNameValid] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(false);
    

    // 아이디 유효성검사 ============================================


    const idRegexs = {
        idRegex: /^[a-zA-Z][a-zA-Z0-9]{2,19}$/
    };

    const [idError, setidError] = useState('');
    
    const handleIdChange = (e) =>{
        const newId = e.target.value;
        
    if(!idRegexs.idRegex.test(newId)){
        setidError('영문자로 시작하는 3~20자의 영문, 숫자만 사용 가능합니다.');
    } else{
        setidError('');
    }

    setIsIdValid(false);
    setIsIdCheckClicked(false);

    setId(newId);
    }


    
    // 비밀번호 유효성 검사 ======================================

    const [passwordError, setPasswordError] = useState('');
    
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;

        if (newPassword.length === 0) {
            setPasswordError('');
          } else if (newPassword.length < 8) {
            setPasswordError('비밀번호는 최소 8자 이상 16자 이하');
          } else if (newPassword.length > 16) {
            setPasswordError('비밀번호는 16자 이하여야합니다.');
          } else {
            setPasswordError('사용가능한 비밀번호입니다.');
          }
    }

    // 비밀번호 확인이 비밀번호랑 일치하는지 =======================
    
    const [passwordCheck, setPasswordCheck] = useState('');

    const handlePasswordCheck = (e) => {
        const newPassword = e.target.value;

      if (password === newPassword) {
            setPasswordCheck('비밀번호가 일치합니다.');
        } else if(newPassword.length == 0) {
            setPasswordCheck('');
        }
            else{
            setPasswordCheck('비밀번호가 일치하지 않습니다.');
        } 
     
    }

    // 생년월일은 형식에 맞게 =========================

    const birthdayRegex = /^\d{4}\d{2}\d{2}$/;
    const [birthdayCheck , setBirthdayCheck] = useState('');
    const [birthdayError , setBirthdayError] = useState('');

    const handleBirthdayCheck = (e) => {
        const newBirthday = e.target.value;
        
            if(newBirthday.length === 0){
                setBirthdayError('');
                setBirthdayCheck('');
                return;
            }

            if(!birthdayRegex.test(newBirthday)){
                setBirthdayError('생년월일은 YYYYMMDD 형식으로 입력해주세요.');
                setBirthdayCheck('');
            } else{
                setBirthdayCheck('');
                setBirthdayError('굿');
            }
    };




     
    // 모든 폼 유효성을 추적할 상태 추가
    const [isFormValid, setIsFormValid] = useState(false);
    // 유효성 검사 상태 확인 및 유효성 업데이트
    useEffect(()=> {
        setIsFormValid(
            idError === '' &&
            passwordError === '사용가능한 비밀번호입니다.' &&
            passwordCheck.includes('일치합') &&
            birthdayError === '굿' &&
            isIdValid &&
            phone !== "" &&
            address !== "" &&
            addressDetail !== "" &&
            name !== ""
        );
    }, [idError, passwordError, passwordCheck, birthdayError, isIdValid, phone, address, zipCode, addressDetail, name]);




    // 회원가입 눌렀을때 작동하는 방식
    const handleSignUp = () => {
        if (isFormValid){
        let member = {
            memberId :id ,
            memberPwd : password,
            memberName : name,
            address,
            addressDetail,
            zipCode : inputZipCodeValue,
            birthday,
            email,
            phone
        }
        console.log(member);
        axios
        .post("http://localhost:3000/member/SignUp", member)
        .then(response => {
            alert("회원가입 성공");
            navigate("/");
        })
        .catch(error => {
            console.error("회원가입 에러", error);
        });
    } else{
        alert("양식을 올바르게 작성해주세요.");
    }
    }
//========================================================== 


// 중복검사 버튼 ============================================
const idMatching = async () => {

    let member = {
        memberId: id
    };

    setIsIdCheckClicked(true);

    try {
        const response = await axios.post("/member/SignUp/idCheck", member.memberId);

        
        if (response.data.memberId === undefined) {
            alert("사용가능한 아이디입니다.");
            setIsIdAvailable(true);
            setIsIdValid(true);
          
        } else if (response.data.memberId === member.memberId) {
            alert("이미 존재하는 아이디입니다.");
            setIsIdAvailable(false);
            setIsIdValid(false);
        }
    } catch (error) {
        console.error("중복 처리 검사 에러", error);
        window.alert("중복 처리 에러 발생");
    };
};





    return (
        <>
<div className='form-container'>
<form>
  <fieldset>
    <legend>회원가입</legend>


    <div className="mb-3">
      <label for="disabledTextInput" className="form-label">아이디</label>
      <div className='signUp-id-box'>
        <input type="text" value={id} className = "form-control" onChange={(e) => {setId(e.target.value); handleIdChange(e)}} 
        style={{ width: '200px' }} /> 
        <button type="button" className="btn btn-primary doubleCheck-btn" onClick={idMatching}>중복확인</button>
      </div>
    {idError && (
        <span style={{ color: 'red' }}>{idError}</span>
        )}
    </div>


    <div className='signUp-password'>
      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">비밀번호
        <input type="password" id="disabledTextInput" className="form-control"  onChange={(e) => {setPassword(e.target.value); handlePasswordChange(e)}}
        style={{ width: '250px' }}/>
      {passwordError && (
      <span style={{ color: passwordError.includes('사용가능') ? 'green' : 'red' }}>{passwordError}</span>
      )}
      </label>
      </div>


      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">비밀번호 확인
        <input type="password" class = "form-control" value={confirm} onChange={(e) => {setConfirm(e.target.value); handlePasswordCheck(e)}}
        style={{ width: '250px' }}/>
      {passwordCheck && (
      <span style={{color: passwordCheck.includes('일치합') ? 'green' : 'red'}}>{passwordCheck}</span>
      )}
      </label>
      </div>
    </div>

    <div className='signUp-name'>
      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">이름</label>
        <input type="text" value={name} className='form-control' onChange={(e) => setName(e.target.value)} 
        style={{ width: '250px' }}/>
      </div>

      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">생년월일</label>
        <input type="text" id="disabledTextInput" className="form-control"value={birthday} onChange={(e) => {setBirthday(e.target.value); handleBirthdayCheck(e)}} 
        style={{ width: '250px' }}/>
        {birthdayError && (
      <span style={{ color: 'red' }}>{birthdayError}</span>)}
      
      </div>
    </div>
    

    <div className="mb-3">
      <label for="disabledTextInput" className="form-label">이메일
      <input type="text" id="disabledTextInput" className="form-control"value={email} onChange={(e) => setEmail(e.target.value)} 
      style={{ width: '250px' }}/>
    </label>
    </div>

    <div className="mb-3">
      <label for="disabledTextInput" className="form-label">전화번호
      <input type="text" id="disabledTextInput" className="form-control"value={phone} onChange={(e) => setPhone(e.target.value)} 
      style={{ width: '250px' }}/>
    </label>
    </div>

    <div>
        <label for="disabledTextInput" className="form-label">우편번호</label>
      <div className="mb-3 signUp-postcode">
        <input type="text" id="disabledTextInput" className="form-control"readOnly value={inputZipCodeValue} onChange={(e) => setzipCode(e.target.value)} placeholder='우편번호' 
        style={{ width: '100px' }}/>
      <button type="button" onClick={toggleModal} className= "btn btn-primary address-btn">주소 찾기</button>
      </div>
    </div>
      
    <div className='signUp-address'>
      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">주소</label>
        <input type="text" id="disabledTextInput" className="form-control" readOnly value={address} onChange = {(e) => setInputAddressValue(e.target.value)} 
        style={{ width: '250px' }}/>
        
        {/* Daum 주소 API 컴포넌트 */}
        <Modal show={modalState} onHide={handleModalClose} dialogClassName='DaumModal'>
          <Modal.Header closeButton>
          <Modal.Title>내 주소 찾기</Modal.Title>
          </Modal.Header>
          <Modal.Body className='DaumModalBody'>
          <DaumPost onCompletePost={onCompletePost} />
          </Modal.Body>
      </Modal>
      </div>

      <div className="mb-3">
        <label for="disabledTextInput" className="form-label">상세주소</label>
        <input type="text" id="disabledTextInput" className="form-control"value={addressDetail} onChange={(e) => setAddressDetail(e.target.value)} placeholder='상세 주소를 입력하세요.'
        style={{ width: '250px' }}/>
      </div>
    </div>


    <button type="submit" className="btn btn-primary inroll-btn" onClick={handleSignUp} disabled = {!isFormValid }>회원가입</button>
  </fieldset>
        
</form>
</div>
        </>
    );
};
export default SignUp;