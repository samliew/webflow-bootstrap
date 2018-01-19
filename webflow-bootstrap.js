/**
 * webflow-bootstrap - Webflow to Bootstrap convertor
 *
 * @author   Samuel Liew <samliew@gmail.com>
 * @license  MIT license
 * @version  1.0.0
 * @link     https://github.com/samliew/webflow-bootstrap
 */

/* global jQuery, $ */

var Webflow = Webflow || [];
Webflow.push(function() {
  
  // Helper functions
  function randNum() { return Math.floor(Math.random() * 999999) + 100000 };
  
  // Load Bootstrap stylesheet
  $('<link>').appendTo('head').attr({ type:'text/css', rel:'stylesheet', href:'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/css/bootstrap.min.css'});
  
  // Convert Typography & Content
  $('.w-container').addClass('container').removeClass('w-container');
  $('blockquote').addClass('blockquote');
  $('table').addClass('table');
  $('.w-richtext-figure-type-image').addClass('figure').each(function() {
    $(this).find('img').addClass('figure-img img-fluid');
    $(this).find('figcaption').addClass('figure-caption').css('margin', 'auto');
  });
  
  // Convert Navigation
  $('.w-nav').each(function() {
    var navToggleId = 'navtt-' + randNum();
    $(this).children('.container').children().first().unwrap();
    $(this).find('.w-nav-brand').addClass('navbar-brand').removeClass('w-nav-brand');
    $(this).find('.w-nav-button').off().after('<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#'+navToggleId+'" />');
    $(this).find('.w-icon-nav-menu').addClass('navbar-toggler-icon').removeClass('w-icon-nav-menu').appendTo('.navbar-toggler');
    $(this).find('.w-nav-button').remove();
    $(this).find('.w-dropdown-toggle').off().addClass('nav-link dropdown-toggle').removeClass('w-dropdown-toggle').text((i,str) => str);
    $(this).find('.w-dropdown').each(function() {
      var randId = 'navdd-' + randNum();
      $('<li class="nav-item dropdown '+this.classList.value+'" />')
        .removeClass('w-dropdown')
        .attr('id', randId)
        .insertAfter($(this))
        .append($(this).children())
        .find('.dropdown-toggle').attr({
          'data-toggle': 'dropdown',
          'id': randId
        });
      $(this).remove();
    });
    $(this).find('.w-nav-menu').addClass('collapse navbar-collapse').removeClass('w-nav-menu').attr('id', navToggleId).appendTo(this);
    $(this).find('.w-nav-link').addClass('nav-link').removeClass('w-nav-link').attr('href', '#').wrap('<li class="nav-item" />');
    $(this).find('.nav-link.w--current').parent().addClass('active');
    $(this).find('.nav-item').wrapAll('<ul class="navbar-nav mr-auto" />');
    $(this).find('.w-nav-overlay').remove();
    $(this).off().addClass('navbar navbar-expand-lg navbar-light bg-light fixed-top').removeClass('w-nav');
  });
  
  // Convert all other dropdowns (not in w-nav)
  $('.w-dropdown-toggle').off().addClass('btn btn-secondary dropdown-toggle').removeClass('w-dropdown-toggle').text((i,str) => str);
  $('.w-dropdown').each(function() {
    var randId = 'dd-' + randNum();
    $('<div class="btn-group dropdown '+this.classList.value+'" />')
      .removeClass('w-dropdown')
      .attr('id', randId)
      .insertAfter($(this))
      .append($(this).children())
      .find('.dropdown-toggle').attr({
        'data-toggle': 'dropdown',
        'id': randId
      });
    $(this).remove();
  });
  $('.w-dropdown-list').addClass('dropdown-menu').removeClass('w-dropdown-list');
  $('.w-dropdown-link').addClass('dropdown-item').removeClass('w-dropdown-link');
  
  // Convert Forms
  $('.w-form-label').addClass('custom-control-label');
  $('label').not('.w-form-label').each(function() {
    var elems = $(this);
    var elem = $(this);
    while (elem.length) {
      elem = elem.next().not('label, button, input:submit');
      elems = elems.add(elem);
    }
    elems.wrapAll('<div class="form-group" />')
  });
  $('.w-input').addClass('form-control').removeClass('w-input');
  $('.w-select').addClass('custom-select').removeClass('w-select');
  $('.w-checkbox').addClass('custom-control custom-checkbox').removeClass('w-checkbox');
  $('.w-radio').addClass('custom-control custom-radio').removeClass('w-radio');
  $('.w-checkbox-input, .w-radio-input').addClass('custom-control-input').removeClass('w-checkbox-input w-radio-input');
  $('.w-button').addClass('btn btn-primary').removeClass('w-button');
  $('.form-text').addClass('small');
  
  // Convert Tabs
  $('.w-tab-menu').addClass('nav nav-tabs').removeClass('w-tab-menu');
  $('.w-tab-link').off().addClass('nav-link').removeClass('w-tab-link').wrap('<div class="nav-item w-inline-block" />')
  $('.nav-link.w--current').addClass('active');
    
  // Add tab click event
  $('.nav-item').click(function() {
    $(this).children().addClass('active w--current');
    $(this).siblings().children().removeClass('active w--current');
  });
  
  // Finally load the Bootstrap script
  $.getScript("https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.3/js/bootstrap.bundle.min.js", 
    function(data, textStatus, jqxhr){
      console.info('Webflow to Bootstrap conversion completed. Info: https://github.com/samliew/webflow-bootstrap');
    });
  
});
// EOF