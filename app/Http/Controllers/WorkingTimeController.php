<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\WorkingTime;

class WorkingTimeController extends Controller
{
    //const $lunch = '01:00';       //длительность перерыва
    public function Calculate(){
      header("Content-Type: application/json");
      // разбираем JSON-строку на составляющие встроенной командой
      $data = json_decode(stripslashes($_GET['data']));

      //получаем календарь с не рабочими днями
      $calendar = simplexml_load_file('http://xmlcalendar.ru/data/ru/'.date('Y').'/calendar.xml');
      $calendar = $calendar->days->day;
      foreach( $calendar as $day ){
          $d = (array)$day->attributes()->d;
          $d = $d[0];
          $d = substr($d, 3, 2).'.'.substr($d, 0, 2).'.'.date('Y');
          //не считая короткие дни
          if( $day->attributes()->t == 1 )
            $arHolidays[] = $d;
      }
      //получаем список пользователей и их график работы
      $arUsers = WorkingTime::getUsers($data->userId);
      //print_r($arHolidays);
      while (strtotime($data->startDate)<=strtotime($data->endDate)) {
        $checkHoliday = $this->DayIsHoliday($data->startDate,$arHolidays);
        $checkVacation = $this->DayIsVacation($data->startDate,$arUsers['vacation']);
        $checkWeekend = $this->DayIsWeekend($data->startDate);
        if(!$checkVacation&&!$checkHoliday&&!$checkWeekend)
        {
          $schedule[] = ['day'=>$data->startDate,'timeRanges'=>$arUsers['schedule']];
          $nonworking[] = ['day'=>$data->startDate,'timeRanges'=>$arUsers['schedule']];
        }else{
          $nonworking[] = ['day'=>$data->startDate,'timeRanges'=>array('am'=>array('start'=>'00:00','end'=>'00:00'))];
        }
        $data->startDate = date ("Y-m-d", strtotime("+1 day", strtotime($data->startDate)));
      }
      $arJson['schedule']=$schedule;
      $arJson['nonworking']=$nonworking;
      echo json_encode($arJson);
      return '';
    }

    public function DayIsHoliday($day,$holidays){
      foreach ($holidays as $holidayd) {
        if(strtotime($day)==strtotime($holidayd))
          return true;
      }
      return false;
    }
    public function DayIsVacation($day, $vacations){
      foreach ($vacations as $vacation) {
        if(strtotime($vacation['start'])<=strtotime($day)&&strtotime($vacation['end'])>=strtotime($day))
          return true;
        }
        return false;
      }
      public function DayIsWeekend($day){
        $dayNum = date('w', strtotime($day));
        if($dayNum == 0 || $dayNum == 6){
          return true;
        }
        return false;
      }
}
