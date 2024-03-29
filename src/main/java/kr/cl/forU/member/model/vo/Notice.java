package kr.cl.forU.member.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class Notice {

	private int noticeNo;
	private int noticeType;
	private int memberNo;
	
	private String noticeMessage;
	private String memberId;
	private String memberName;
}
