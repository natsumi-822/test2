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
			moving(x,y){}
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
					$('.' + u + 'StatusWindow').hide();
					$('.comandWindow').hide();
					windowOpenFlag = false;
				}

				else if(windowOpenFlag === false){
					if(u === "player"){
						$(".playerUnit").append("<div class ='" + u + "StatusWindow'></div>");
						//コマンドウィンドウ
						$(".field_map").append("<div class ='comandWindow'></div>");
						$(".comandWindow").append("<p class ='comandMove' data-id='move'>移動</p>");
						$(".comandWindow").append("<p class ='comandAttack' data-id='attack'>攻撃</p>");
					}
					else if(u === "enemy"){
						$(".enemyUnit").append("<div class ='" + u + "StatusWindow'></div>");
					}
					else if(u === "other"){
						$(".otherUnit").append("<div class ='" + u + "StatusWindow'></div>");
					}

					$('.' + u + 'StatusWindow').append("<p>" + this.getName() + "</p>");
					$('.' + u + 'StatusWindow').append("<p>所属:" + this.getBelong() + "</p>");
					$('.' + u + 'StatusWindow').append("<p>クラス:" + this.getJob() + "</p>");
					$('.' + u + 'StatusWindow').append("<p>HP:" + this.getHp() + "</p>");
					$('.' + u + 'StatusWindow').append("<p>攻撃力:" + this.getAttack() + "</p>");
					$('.' + u + 'StatusWindow').append("<p>守備力:" +this.getDefense() + "</p>");
					$('.' + u + 'StatusWindow').append("<p>移動:" +this.getDefense() + "</p>");
					windowOpenFlag = true;
				}
			}

			//キャラクター移動
			moving(x,y){
				console.log(x,y);
				$(".playerUnit").animate({
					 "marginLeft": "100px"
			    }).animate({
			        "marginTop": "-100px"
				});
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
		}

		//その他ユニット
		class otherUnit extends Unit{
			constructor(name,belong,job,hp,attack,defense,move) {
				super();
				this.name = "おじさん";
				this.belong = "simple村";
				this.job = "村人";
				this.hp = 8;
				this.attack = 1;
				this.defense = 2;
				this.move = 2;
		    }
		}

		/***********初期画面***********************************************/
		$(document).ready(function(){
			//map描画
			var array = [
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
			var x = 1; var y = 1;
			for (var i = 0; i < 10; i++){
			    for (var j = 0; j < 20; j++){
			    	$(".field_map").append("<div class='map_mass map_mass" + x + "'></div>");
			    	x++;
			    }
			    $(".field_map").append("<br>");
			}

			//ユニットを初期位置に出現させる

			var t = new Torphin();
			$(".map_mass190").append("<div class ='" + "playerUnit'></div>");

			var e = new enemyUnit();
			$(".map_mass10").append("<div class ='" + "enemyUnit'></div>");

			var o = new otherUnit();
			$(".map_mass101").append("<div class ='" + "otherUnit'></div>");

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
			$('.comandMove').click(function() {
				t.moving(4,8);
				console.log(aaa);
			});

			//攻撃
			$('.comandAttack').click(function() {
				$(".massageWindow").append(t.attackOn(e));
				})
			});
