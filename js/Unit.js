//グローバル変数
let windowOpenFlag = false;
let prayerUnitPotionId = 110;
let turn = 1;

//インターフェース
class Human {
	constructor(name,hp,attack,defense,move) {
		this.name = name;
		this.hp = hp;
		this.attack = attack;
		this.defense = defense;
		this.move = move;
	}
	getName() {return this.name;}
	getHp() {return this.hp;}
	getAttack() {return this.attack;}
	getDefense() {return this.defense;}
	getMove() {return this.move;}

	showStatus(u){}
	moving(p){}
	unitPosition(p){}
}

//全種ユニット
class Unit extends Human{
	constructor(name,belong,job,hp,attack,defense,move) {
		super();
		this.name = name;
		this.belong = belong;
		this.job = job;
		this.hp = hp;
		this.attack = attack;
		this.defense = defense;
		this.move = move;
	}

	getBelong() {return this.belong;}
	getJob() {return this.job;}

	showStatus(u) {//ステータスウィンドウ
		if(windowOpenFlag === true){
			$('.' + u + 'StatusWindow').fadeOut(200).slideDown(500);
			$('.' + u + 'StatusWindow').remove();

			//移動範囲閉じる
			windowOpenFlag = false;
		}

		else if(windowOpenFlag === false){
			if(u === "player"){
				$(".field").append("<ul class ='" + u + "StatusWindow statusWindow window'></ul>");
				$(".statusWindow").hide().fadeIn(200).slideDown(500);
			}
			else if(u === "enemy"){
				$(".enemyUnit").append("<ul class ='" + u + "StatusWindow statusWindow window'></ul>");
				$(".statusWindow").hide().fadeIn(200).slideDown(500);
			}
			else if(u === "other"){
				$(".otherUnit").append("<ul class ='" + u + "StatusWindow statusWindow window'></ul>");
				$(".statusWindow").hide().fadeIn(200).slideDown(500);
			}

			$('.' + u + 'StatusWindow').append("<li><em>" + this.getName() + "</em></li>");
			$('.' + u + 'StatusWindow').append("<li>BELONG　<em>" + this.getBelong() + "</em></li>");
			$('.' + u + 'StatusWindow').append("<li>CLASS　<em>" + this.getJob() + "</em></li>");
			$('.' + u + 'StatusWindow').append("<li>HP　<em><span>" + this.getHp() + "</span></em></li>");
			$('.' + u + 'StatusWindow').append("<li>ATTACK　<em><span>" + this.getAttack() + "</span></em></li>");
			$('.' + u + 'StatusWindow').append("<li>DEFENSE　<em><span>" +this.getDefense() + "</span></em></li>");
			$('.' + u + 'StatusWindow').append("<li>MOVE　<em><span>" +this.getMove() + "</span></em></li>");
			windowOpenFlag = true;
		}
	}
}//unitEnd

//味方ユニット
class playerUnit extends Unit {
	constructor() {
		super();
	}

	//攻撃
	attackOn(e, playerHp){
		//$( ".unitHpGaugeInner" ).css( "width" , hogeWidth );
		e.hp -= this.attak;
		$(".massageWindow").append(`<p>${e.hp}</p>`)
		let intEhp =  parseInt(e.hp);
		$(".massageWindow").append("<p>" + this.getName() + "の攻撃！敵に"+ this.getAttack() + "ダメージ！" + intEhp + "</p>");
		if(e.hp <= 0){
			$(".massageWindow").append("<p>" + this.getName() + "戦闘不能！</p>");
		}
	}
}

//トルフィン
class Torphin extends playerUnit{
	constructor(name,belong,job,hp,attack,defense,move) {
		super();
		this.name = "トルフィン";
		this.belong = "アシェラッド傭兵団";
		this.job = "傭兵";
		this.hp = 15;
		this.attack = 7;
		this.defense = 3;
		this.move = 2;
	}

	unitPosition(p){
		$("#" + p).append("<div class ='" + "playerUnit'><div class='unitHpGauge'><div class='unitHpGaugeInner'></div></div></div>");
	}

	unitMoveingArea(p){
		//移動 & 攻撃マスを出力
		let num = 20;
		let nowPsition = parseInt(p, 10);
		for (var i = 1; i < this.move+1; i++) {//移動可能範囲マス 縦横出力
			$("#" + nowPsition).addClass("unitMoveingArea");
			$("#" + (nowPsition+i)).addClass("unitMoveingArea");
			$("#" + (nowPsition-i)).addClass("unitMoveingArea");
			$("#" + (nowPsition+(num*i))).addClass("unitMoveingArea");
			$("#" + (nowPsition-(num*i))).addClass("unitMoveingArea");

			if(i === this.move/2){//移動可能範囲マス ななめ
				$("#" + (nowPsition+i+num)).addClass("unitMoveingArea");
				$("#" + (nowPsition+i-num)).addClass("unitMoveingArea");
				$("#" + (nowPsition-i+num)).addClass("unitMoveingArea");
				$("#" + (nowPsition-i-num)).addClass("unitMoveingArea");
			}

			if(i === this.move){//Attackマス出力
				//縦横
				$("#" + (nowPsition+this.move+1)).addClass("unitAttackArea");
				$("#" + (nowPsition-this.move-1)).addClass("unitAttackArea");
				$("#" + (nowPsition+(this.move*num)+num)).addClass("unitAttackArea");
				$("#" + (nowPsition-(this.move*num)-num)).addClass("unitAttackArea");
				//右斜め
				$("#" + (nowPsition+this.move+num)).addClass("unitAttackArea");
				$("#" + (nowPsition+this.move-num)).addClass("unitAttackArea");
				$("#" + (nowPsition-this.move+num)).addClass("unitAttackArea");
				$("#" + (nowPsition-this.move-num)).addClass("unitAttackArea");
				//左斜め
				$("#" + (nowPsition+this.move+(num*this.move)-1)).addClass("unitAttackArea");
				$("#" + (nowPsition+this.move-(num*this.move)-1)).addClass("unitAttackArea");
				$("#" + (nowPsition-(num*this.move)-1)).addClass("unitAttackArea");
				$("#" + (nowPsition+(num*this.move)-1)).addClass("unitAttackArea");
			}
		}
	}

	//キャラクター移動
	moving(p){
		//クリックされたマスid取得
		let newUnitPosition = $("#" + p);
		let position = newUnitPosition.position();
		$(".playerUnit").animate({left: position.left, top: position.top});
	}

	//キャラクター待機
	waiting(){
		$('.map_mass').removeClass('unitMoveingArea unitAttackArea');
		$(".playerUnit").remove();
		//ターン追加
		turn++;
		$(".turnWindow").html("Turn <span>" + turn + "</span>");
	}
}

//敵ユニット
class enemyUnit extends Unit{
	constructor(name,belong,job,hp,attack,defense,move) {
		super();
		this.name = "トルケル";
		this.belong = "トルケル傭兵団";
		this.job = "団長";
		this.hp = 60;
		this.attack = 35;
		this.defense = 30;
		this.move = 4;
	}
	unitPosition(p){
		$("#" + p).append("<div class ='" + "enemyUnit'></div>");
	}
}

//その他ユニット
class otherUnit extends Unit{
	constructor(name,belong,job,hp,attack,defense,move) {
		super();
		this.name = "クヌート";
		this.belong = "クヌート軍";
		this.job = "王子";
		this.hp = 8;
		this.attack = 1;
		this.defense = 2;
		this.move = 2;
	}
	unitPosition(p){
		$("#" + p).append("<div class ='" + "otherUnit'></div>");
	}
}

/***********初期画面***********************************************/
$(document).ready(function(){
	//map描画
	var fieldMapArray = [
		[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[2,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[3,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[4,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[5,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[6,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[7,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[8,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[9,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
		[10,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]
		];
	let x = 0; let y = 0;
	for (var i = 0; i < 10; i++){
		for (var j = 0; j < 20; j++){
			fieldMapArray[x][y] = $(".field_map").append("<li class='map_mass' id='" + y + "'></li>");
			y++;
		}
		x++;
		$(".field_map").append("<br>");
	}
	//ターン数
	$(".turnWindow").append("Turn <span>" + turn + "</span>");

	//ユニットを初期位置に出現させる
	var t = new Torphin();
	t.unitPosition(prayerUnitPotionId);

	var e = new enemyUnit();
	e.unitPosition(10);

	var o = new otherUnit();
	o.unitPosition(5);

	//味方ユニットクリック
	$(".playerUnit").click(() => t.showStatus("player"));

	//敵ユニット
	$(".enemyUnit").click(() => e.showStatus("enemy"));

	//他ユニット
	$(".otherUnit").click(() => o.showStatus("other"));

	//移動コマンド
	$('.comandMove').click(() => {
		t.unitMoveingArea(prayerUnitPotionId);
		//移動アニメ
		$('.unitMoveingArea').click(event => {
			prayerUnitPotionId = $(event.currentTarget).attr('id');
			t.moving(prayerUnitPotionId);
		});
	});
	//攻撃
	$('.comandAttack').click(() => {
		t.attackOn(e, this.hp);
	});

	//状態
	$(".comandStatus").click(() => t.showStatus("player"));

	//待機
	$(".comandWaiting").click(() => {
		t.waiting();
		//味方ユニットの位置を再設定
		t.unitPosition(prayerUnitPotionId);
	});
});//(document).ready

