package webex.controller;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import webex.dao.MemberDao;
import webex.vo.MemberVO;

/**
 * Servlet implementation class MemberServlet
 */
@WebServlet("/Member.do")
public class MemberServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String userId = request.getParameter("userId");
		String uesrPw = request.getParameter("uesrPw");
		String userNm = request.getParameter("userNm");
		String email1 = request.getParameter("email1");
		String email2 = request.getParameter("email2");
		String birthDate = request.getParameter("birthDate");
		String gender = request.getParameter("gender");
		String regDate = request.getParameter("regDate");
		String photo = request.getParameter("photo");
		
		if (photo.trim().length() < 1 || photo == null) {
			photo = "";
		}
		
		MemberVO mvo = new MemberVO(userId, uesrPw, userNm, email1, email2, 
				birthDate, gender, regDate, photo);
		
		MemberDao mdao = new MemberDao();
		
		if (mdao.insert(mvo) == true) {
			//join03.jsp로 이동
			//회원가입 완료 메시지 -> 로그인
		} else {
			//join02.jsp로 이동
			//회원가입 실패 ->
			//dispatcher forward
		}
				
	}

}
