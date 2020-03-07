//グローバル変数
let windowOpenFlag = false;
let playerUnitPotionId = 110;
let enemyUnitPositionId = 10;
let turn = 1;

//インターフェース
class Human {
	constructor(name,maxHp,hp,attack,defense,move) {
		this.name = name;
		this.maxHp = maxHp;
		this.hp = hp;
		this.attack = attack;
		this.defense = defense;
		this.move = move;
	}
	getName() {return this.name;}
	getMaxHp() {return this.maxHp;}
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
	constructor(name,belong,job,hp,maxHp,attack,defense,move) {
		super();
		this.name = name;
		this.belong = belong;
		this.job = job;
		this.maxHp = maxHp;
		this.hp = hp;
		this.attack = attack;
		this.defense = defense;
		this.move = move;
	}

	getBelong() {return this.belong;}
	getJob() {return this.job;}

	showStatus(u) {//ステータスウィンドウ
		if(windowOpenFlag === true){
			$(`.${u}StatusWindow`).fadeOut(500).remove();

			//移動範囲閉じる
			windowOpenFlag = false;
		}

		else if(windowOpenFlag === false){
			if(u === "player"){
				$(".field").append(`<ul class ='${u}StatusWindow statusWindow window'></ul>`);
				$(".statusWindow").hide().fadeIn(200);
				windowOpenFlag = true;
			}
			else if(u === "enemy"){
				$(".enemyUnit").append(`<ul class ='${u}StatusWindow statusWindow window'></ul>`);
				$(".statusWindow").hide().fadeIn(200);
				windowOpenFlag = true;
			}
			else if(u === "other"){
				$(".otherUnit").append(`<ul class ='${u}StatusWindow statusWindow window'></ul>`);
				$(".statusWindow").hide().fadeIn(200);
				windowOpenFlag = true;
			}

			$(`.${u}StatusWindow`).append(`<li>${this.getName()}</li>`);
			$(`.${u}StatusWindow`).append(`<li>BELONG　${this.getBelong()}</li>`);
			$(`.${u}StatusWindow`).append(`<li>CLASS　${this.getJob()}</li>`);
			$(`.${u}StatusWindow`).append(`<li>HP　<span>${this.getHp()} / ${this.getMaxHp()}</span></li>`);
			$(`.${u}StatusWindow`).append(`<li>ATTACK　<span>${this.getAttack()}</span></li>`);
			$(`.${u}StatusWindow`).append(`<li>DEFENSE　<span>${this.getDefense()}</span></li>`);
			$(`.${u}StatusWindow`).append(`<li>MOVE　<span>${this.getMove()}</span></li>`);
		}
	}
}//unitEnd

//味方ユニット
class playerUnit extends Unit {
	constructor() {
		super();
	}

	//攻撃
	attackOn(e,unit){
		$('.js-modal').fadeIn();
		$('.js-modal-close').on('click',function(){
			$('.js-modal').fadeOut();
			$('.modal__content').empty();
		});
		e.hp -= this.getAttack();

		$(".modal__content").append(`<p>${this.getName()}の攻撃！${e.name}に${this.getAttack()}ダメージ！</p>`);
		if(e.hp <= 0){
			$(`.${unit}Unit`).remove();
			$(".modal__content").append(`<p>${e.name}戦闘不能！</p>`);
		}

		let hp = e.hp / e.maxHp * 100;//残HPが何%か
		$(`.${unit}Unit .unitHpGaugeInner`).css('width',`${hp}%`);

		if(hp >= 90){
			$(`.${unit}Unit .unitHpGaugeInner`).css('background','linear-gradient(-90deg, rgba(0, 46, 255, .8), rgba(0, 2, 34, .8))');
		}
		else if(hp < 90 && hp > 60){
			$(`.${unit}Unit .unitHpGaugeInner`).css('background','linear-gradient(-90deg, rgba(0, 255, 19, .6), rgba(0, 48, 14, .8))');
		}
		else if(hp < 40 && hp >= 1){
			$(`.${unit}Unit .unitHpGaugeInner`).css('background','linear-gradient(-90deg, rgba(255, 0, 0, .6), rgba(0, 0, 34, .8))');
		}
	}
}

//トルフィン
class Torphin extends playerUnit{
	constructor(name,belong,job,maxHp,hp,attack,defense,move) {
		super();
		this.name = "トルフィン";
		this.belong = "アシェラッド傭兵団";
		this.job = "傭兵";
		this.maxHp = 15;
		this.hp = 12;
		this.attack = 7;
		this.defense = 3;
		this.move = 2;
	}

	unitPosition(p){
		$(`#${p}`).append("<div class ='playerUnit'><div class='unitHpGauge'><div class='unitHpGaugeInner'></div></div></div>");
	}

	unitMoveingArea(p){
		//移動 & 攻撃マスを出力
		let num = 20;
		let nowPosition = parseInt(p, 10);
		for (var i = 1; i < this.move+1; i++) {//移動可能範囲マス 縦横出力
			if(!(nowPosition === enemyUnitPositionId)){
				$(`#${nowPosition}`).addClass("unitMoveingArea");
				$(`#${nowPosition + i}`).addClass("unitMoveingArea");
				$(`#${nowPosition - i}`).addClass("unitMoveingArea");
				$(`#${nowPosition + (num * i)}`).addClass("unitMoveingArea");
				$(`#${nowPosition - (num * i)}`).addClass("unitMoveingArea");

				if(i === this.move/2){//移動可能範囲マス ななめ
					$(`#${nowPosition + num + i}`).addClass("unitMoveingArea");
					$(`#${nowPosition - num + i}`).addClass("unitMoveingArea");
					$(`#${nowPosition - i + num}`).addClass("unitMoveingArea");
					$(`#${nowPosition - i - num}`).addClass("unitMoveingArea");
				}
			}

			if(i === this.move){//Attackマス出力
				//縦横
				$(`#${nowPosition + this.move + 1}`).addClass("unitAttackArea");
				$(`#${nowPosition - this.move - 1}`).addClass("unitAttackArea");
				$(`#${nowPosition + (this.move * num) + num}`).addClass("unitAttackArea");
				$(`#${nowPosition - (this.move * num) - num}`).addClass("unitAttackArea");
				//右斜め
				$(`#${nowPosition + this.move + num}`).addClass("unitAttackArea");
				$(`#${nowPosition + this.move - num}`).addClass("unitAttackArea");
				$(`#${nowPosition - this.move + num}`).addClass("unitAttackArea");
				$(`#${nowPosition - this.move - num}`).addClass("unitAttackArea");
				//左斜め
				$(`#${nowPosition + this.move + (num * this.move) -1}`).addClass("unitAttackArea");
				$(`#${nowPosition + this.move - (num * this.move) -1}`).addClass("unitAttackArea");
				$(`#${nowPosition - (num * this.move) -1}`).addClass("unitAttackArea");
				$(`#${nowPosition + (num * this.move) -1}`).addClass("unitAttackArea");
			}
		}
	}

	//キャラクター移動
	moving(p){
		let newUnitPosition = $(`#${p}`);
		let nowPosition = parseInt(p, 10);
		let position = newUnitPosition.position();
		if(!(nowPosition === enemyUnitPositionId)){
			$(".playerUnit").animate({left: position.left, top: position.top});
		}
		//攻撃コマンド出す
		let attackFront = enemyUnitPositionId - 20;
		let attackBack = enemyUnitPositionId + 20;
		let attackRight = enemyUnitPositionId + 1;
		let attackLeft = enemyUnitPositionId - 1;
		if(nowPosition === attackFront || nowPosition === attackBack || nowPosition === attackRight || nowPosition === attackLeft){
			$('.comandAttack').css('display','block');
		}
	}

	//キャラクター待機
	waiting(){
		$('.map_mass').removeClass('unitMoveingArea unitAttackArea');
		$(".playerUnit").remove();
		//ターン追加
		turn++;
		$(".turnWindow").html(`Turn <span>${turn}</span>`);
	}
}

//敵ユニット
class enemyUnit extends Unit{
	constructor(name,belong,job,maxHp,hp,attack,defense,move) {
		super();
		this.name = "トルケル";
		this.belong = "トルケル傭兵団";
		this.job = "団長";
		this.maxHp = 60;
		this.hp = 60;
		this.attack = 35;
		this.defense = 30;
		this.move = 4;
	}
	unitPosition(p){
		$(`#${p}`).append("<div class='enemyUnit'><div class='unitHpGauge'><div class='unitHpGaugeInner'></div></div></div>");
	}
}

//その他ユニット
class otherUnit extends Unit{
	constructor(name,belong,job,maxHp,hp,attack,defense,move) {
		super();
		this.name = "クヌート";
		this.belong = "クヌート軍";
		this.job = "王子";
		this.maxHp = 8;
		this.hp = 8;
		this.attack = 1;
		this.defense = 2;
		this.move = 2;
	}
	unitPosition(p){
		$(`#${p}`).append("<div class='otherUnit'><div class='unitHpGauge'><div class='unitHpGaugeInner'></div></div></div>");
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
			fieldMapArray[x][y] = $(".field_map").append(`<li class='map_mass' id='${y}'></li>`);
			y++;
		}
		x++;
		$(".field_map").append("<br>");
	}
	//攻撃コマンド非表示
	$('.comandAttack').css('display','none');

	//ターン数
	$(".turnWindow").append(`Turn <span>${turn}</span>`);

	//ユニットを初期位置に出現させる
	var t = new Torphin();
	t.unitPosition(playerUnitPotionId);

	var e = new enemyUnit();
	e.unitPosition(enemyUnitPositionId);

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
		t.unitMoveingArea(playerUnitPotionId);
		//移動アニメ
		$('.unitMoveingArea').click(event => {
			playerUnitPotionId = $(event.currentTarget).attr('id');
			t.moving(playerUnitPotionId);
		});
	});
	//攻撃
	$('.comandAttack').click(() => {
		t.attackOn(e,"enemy");
	});

	//状態
	$(".comandStatus").click(() => t.showStatus("player"));

	//待機
	$(".comandWaiting").click(() => {
		t.waiting();
		//味方ユニットの位置を再設定
		t.unitPosition(playerUnitPotionId);
	});
});//(document).ready

