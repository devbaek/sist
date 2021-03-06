console.log("Reply Module.....");

var replyService = (function() {

	function add(reply, callback, error) {
		console.log("add reply........");

		$.ajax({
			type : 'post',
			url : '/replies/new',
			data : JSON.stringify(reply),
			contentType : "application/json; charset=utf-8",
			// 성공이면 (RequestEntity 200이 넘어오면)
			success : function(result, status, xhr) {
				if (callback) {
					callback(result);
				}
			},
			// 에러이면 (RequestEntity 에러가 넘어오면)
			error : function(xhr, stataus, er) {
				if (error)
					error(er);
			}

		});
	}

	function getList(param, callback, error) {

		var bno = param.bno;
		var page = param.page || 1; // 페이지번호가 없으면 1로 처리

		$.getJSON("/replies/pages/" + bno + "/" + page + ".json",
				function(data) {
					if (callback) {
					//	callback(data);	//댓글 목록만 가지고 오는 경우
						callback(data.replyCnt, data.list);	//댓글 숫자와 목록을 가지고 오는 경우
					}
				}).fail(function(xhr, status, err) {
			if (error) {
				error();
			}
		});
	}// end getList

	function remove(rno, callback, error) {
		$.ajax({
			type : 'delete',
			url : '/replies/' + rno,
			success : function(deleteResult, status, xhr) {
				if (callback) {
					callback(deleteResult);
				}
			},
			error : function(xhr, status, er) {
				if (error) {
					error(er);
				}
			}
		});
	}// end remove
	
	
	//댓글 수정
	function update(reply, callback, error) {
		console.log("RNO : " + reply.rno);

		$.ajax({
			type : 'put',
			url : '/replies/' + reply.rno,
			data : JSON.stringify(reply),
			contentType : "application/json; charset=utf-8",
			success : function(result, status, xhr) {
				if (callback) {
					callback(result);
				}
			},
			error : function(xhr, status, er) {
				if (error) {
					error(er);
				}
			}
		});
	}
	
	function get(rno, callback, error) {
		$.get("/replies/" + rno + ".json", function(result) {
			if(callback) {
				callback(result);
			}
		}).fail(function(xhr, status, err) {
			if(error) {
				error();
			}
		});
	}
	
	function displayTime(timeValue) {
		var today = new Date();
		
		var gap = today.getTime() - timeValue;
		
		var dateObj = new Date(timeValue);
		var str = "";
		
		if (gap < (1000 * 60 * 24)) {
			
			var hh = dateObj.getHours();
			var mi = dateObj.getMinutes();
			var ss = dateObj.getSeconds();
			
			return [ (hh > 9 ? '' : '0') + hh, ':', (mi > 9 ? '' : '0') + mi, ':', (ss > 9 ? '' : '0') + ss ].join('');
		} else {
			var yy = dateObj.getFullYear();
			var mm = dateObj.getMonth() + 1;
			var dd = dateObj.getDate();
			
			return [ yy, '/', (mm > 9 ? '' : '0') + mm, '/', (dd > 9 ? '' : '0') + dd ].join('');
		}
	};
	

	return {
		// 앞은 변수명, 뒤는 함수
		add : add,
		getList : getList,
		remove : remove,
		update : update,
		get : get,
		displayTime : displayTime
	};
})();