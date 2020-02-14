		//グローバル変数
		var windowOpenFlag = false;

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
					$('.' + u + 'StatusWindow').remove();
					$('.comandWindow').remove();
					//移動範囲閉じる
					windowOpenFlag = false;
				}

				else if(windowOpenFlag === false){
					if(u === "player"){
						$(".playerUnit").append("<ul class ='" + u + "StatusWindow statusWindow window'></ul>");
						//コマンドウィンドウ
						$(".playerUnit").append("<ul class ='comandWindow'></ul>");
						$(".comandWindow").append("<li class ='comandMove'>移動</li>");
						$(".comandWindow").append("<li class ='comandAttack'>攻撃</li>");
					}
					else if(u === "enemy"){
						$(".enemyUnit").append("<ul class ='" + u + "StatusWindow statusWindow window'></ul>");
					}
					else if(u === "other"){
						$(".otherUnit").append("<ul class ='" + u + "StatusWindow statusWindow window'></ul>");
					}

					$('.' + u + 'StatusWindow').append("<li><em>" + this.getName() + "</em></li>");
					$('.' + u + 'StatusWindow').append("<li>所属　<em>" + this.getBelong() + "</em></li>");
					$('.' + u + 'StatusWindow').append("<li>クラス　<em>" + this.getJob() + "</em></li>");
					$('.' + u + 'StatusWindow').append("<li>HP　<em>" + this.getHp() + "</em></li>");
					$('.' + u + 'StatusWindow').append("<li>攻撃力　<em>" + this.getAttack() + "</em></li>");
					$('.' + u + 'StatusWindow').append("<li>守備力　<em>" +this.getDefense() + "</em></li>");
					$('.' + u + 'StatusWindow').append("<li>移動　<em>" +this.getDefense() + "</em></li>");
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
			attackOn(e){
				e.hp -= this.attak;
				var intEhp =  parseInt(e.hp);
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
				this.move = 4;
			}

			unitPosition(p){
				$("#mass" + p).append("<div class ='" + "playerUnit'></div>");
				$("#mass" + p).append("<div class='unitMoveingArea'></div>");
			}

			//キャラクター移動
			moving(p){
				//クリックされたマスid取得
				var newUnitPosition = $("#" + p);
				var position = newUnitPosition.position();
				$(".playerUnit").animate({left: position.left, top: position.top});
			}
		}

		//敵ユニット
		class enemyUnit extends Unit{
			constructor(name,belong,job,hp,attack,defense,move) {
				super();
				this.name = "敵ヴァイキング";
				this.belong = "トルケル傭兵団";
				this.job = "傭兵";
				this.hp = 15;
				this.attack = 5;
				this.defense = 4;
				this.move = 4;
		    }
			unitPosition(p){
				$("#mass" + p).append("<div class ='" + "enemyUnit'></div>");
			}
		}

		//その他ユニット
		class otherUnit extends Unit{
			constructor(name,belong,job,hp,attack,defense,move) {
				super();
				this.name = "おじさん";
				this.belong = "シンプル村";
				this.job = "村人";
				this.hp = 8;
				this.attack = 1;
				this.defense = 2;
				this.move = 2;
		    }
			unitPosition(p){
				$("#mass" + p).append("<div class ='" + "otherUnit'></div>");
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
			var x = 0; var y = 0;
			for (var i = 0; i < 10; i++){
			    for (var j = 0; j < 20; j++){
			    	fieldMapArray[x][y] = $(".field_map").append("<li class='map_mass' id= mass"+x+"_"+y+"></li>");
			    	y++;
			    }
			    x++;
			    y = 0;
			    $(".field_map").append("<br>");
			}

			//ユニットを初期位置に出現させる
			var t = new Torphin();
			t.unitPosition("9_10");

			var e = new enemyUnit();
			e.unitPosition("1_10");

			var o = new otherUnit();
			o.unitPosition("4_5");

			//味方ユニットクリック
			$(".playerUnit").click(function(){
				t.showStatus("player");
			})
			//敵ユニット
			$(".enemyUnit").click(function(){
				e.showStatus("enemy");
			})
			//他ユニット
			$(".otherUnit").click(function(){
				o.showStatus("other");
			})

			//移動
			$(".map_mass").on("click",function(){
				var mapMass = $(this).attr('id');
				t.moving(mapMass);
			});
			$('.comandWindow').click(function() {
				t.moving();
			});

			//攻撃
			$('.comandAttack').click(function() {
				$(".massageWindow").append(t.attackOn(e));
				})
			});
