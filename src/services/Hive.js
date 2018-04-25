/* eslint-disable */

/*
 *  Document   : Hive.js based on Codebase.js by Pixelcave
 *  Author     : Jean Barriere
 *  Description: Hive Custom Functionalities
 *
 */

if (!Element.prototype.matches) {
  Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.oMatchesSelector
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (selector) {
    var el = this
    while (el) {
      if (el.matches(selector)) {
        return el
      }
      el = el.parentElement
    }
  }
}

if (!Element.prototype.on) {
  Element.prototype.on = function (event, selector, handler) {
    var el = this
    el.addEventListener(event, function (ev) {
      let t = ev.target
      while (t && t !== el) {
        if (t.matches(selector)) {
          handler.call(t, ev)
        }
        t = t.parentNode
      }
    })
  }
}

export class Hive {
  static lHtml
  static lBody
  static lPage
  static lSidebar
  static lSidebarScroll
  static lSideOverlay
  static lSideOverlayScroll
  static lHeader
  static lHeaderSearch
  static lHeaderSearchInput
  static lHeaderLoader
  static lMain
  static lFooter
  static windowW

  // Set helper variables
  static uiInit () {
    this.lHtml = document.querySelector('html')
    this.lBody = document.querySelector('body')
    this.lPage = document.querySelector('#hive')
    this.lSidebar = document.querySelector('#sidebar')
    this.lSidebarScroll = document.querySelector('#sidebar-scroll')
    this.lSideOverlay = document.querySelector('#side-overlay')
    this.lSideOverlayScroll = document.querySelector('#side-overlay-scroll')
    this.lHeader = document.querySelector('#page-header')
    this.lHeaderSearch = document.querySelector('#page-header-search')
    this.lHeaderSearchInput = document.querySelector('#page-header-search-input')
    this.lHeaderLoader = document.querySelector('#page-header-loader')
    this.lMain = document.querySelector('#main-container')
    this.lFooter = document.querySelector('#page-footer')
  }

  /*
   ********************************************************************************************
   *
   * BASE UI FUNCTIONALITY
   *
   * Functions which handle vital UI functionality such as main navigation and layout
   * They are auto initialized
   *
   *********************************************************************************************
   */

  // Handles sidebar and side overlay custom scrolling functionality
  static uiHandleScroll (mode) {
  //   windowW = getWidth()
  //
  //   // Init scrolling
  //   if (mode === 'init') {
  //     var sScrollTimeout
  //     // Unbind events in case they are already binded
  //     jQuery(window).off('resize.cb.scroll orientationchange.cb.scroll');
  //
  //     // Bind the events
  //     jQuery(window).on('resize.cb.scroll orientationchange.cb.scroll', function () {
  //         clearTimeout(sScrollTimeout);
  //
  //         sScrollTimeout = setTimeout(function () {
  //             uiHandleScroll()
  //         }, 150);
  //     }).triggerHandler('resize.cb.scroll');
  // } else {
  //     // If screen width is greater than 991 pixels and .side-scroll is added to #page-container
  //     if (windowW > 991 && lPage.hasClass('side-scroll')) {
  //         // Turn scroll lock off (sidebar and side overlay - slimScroll will take care of it)
  //         jQuery(lSidebar).add(lSideOverlay).scrollLock('disable');
  //
  //         // If sidebar scrolling does not exist init it..
  //         if (lSidebarScroll.length && (!lSidebarScroll.parent('.slimScrollDiv').length)) {
  //           lSidebarScroll.slimScroll({
  //               height: lSidebar.outerHeight(),
  //               color: '#cdcdcd',
  //               size: '4px',
  //               opacity : .9,
  //               wheelStep : 15,
  //               distance : '0',
  //               railVisible: false,
  //               railOpacity: 1
  //           })
  //
  //             // Small hack, so that scrolling works if the mouse is over the scrolling area on load and hasn't moved yet
  //             lSidebarScroll.mouseover();
  //         }
  //         else { // ..else resize scrolling height
  //             lSidebarScroll
  //                 .add(lSidebarScroll.parent())
  //                 .css('height', lSidebar.outerHeight());
  //
  //             // Small hack, so that scrolling works if the mouse is over the scrolling area on load and hasn't moved yet
  //             lSidebarScroll.mouseover();
  //         }
  //
  //         // If side overlay scrolling does not exist init it..
  //         if (lSideOverlayScroll.length && (!lSideOverlayScroll.parent('.slimScrollDiv').length)) {
  //             lSideOverlayScroll.slimScroll({
  //                 height: lSideOverlay.outerHeight(),
  //                 color: '#cdcdcd',
  //                 size: '4px',
  //                 opacity : .9,
  //                 wheelStep : 15,
  //                 distance : '0',
  //                 railVisible: false,
  //                 railOpacity: 1
  //             });
  //         }
  //         else { // ..else resize scrolling height
  //             lSideOverlayScroll
  //                 .add(lSideOverlayScroll.parent())
  //                 .css('height', lSideOverlay.outerHeight());
  //         }
  //     } else {
  //         // Turn scroll lock on (sidebar and side overlay)
  //         jQuery(lSidebar).add(lSideOverlay).scrollLock('enable');
  //
  //         // If sidebar scrolling exists destroy it..
  //         if (lSidebarScroll.length && lSidebarScroll.parent('.slimScrollDiv').length) {
  //             lSidebarScroll
  //                 .slimScroll({destroy: true});
  //             lSidebarScroll
  //                 .attr('style', '');
  //         }
  //
  //         // If side overlay scrolling exists destroy it..
  //         if (lSideOverlayScroll.length && lSideOverlayScroll.parent('.slimScrollDiv').length) {
  //             lSideOverlayScroll
  //                 .slimScroll({destroy: true});
  //             lSideOverlayScroll
  //                 .attr('style', '');
  //         }
  //     }
  // }
  }

  // Resizes #main-container to fill empty space if exists (pushes footer to the bottom) + Adds transition to sidebar (small fix for IE)
  static uiHandleMain () {
    // var resizeTimeout;
    //
    // // Unbind events in case they are already binded
    // jQuery(window).off('resize.cb.main orientationchange.cb.main');
    //
    // // If #main-container element exists
    // if (lMain.length) {
    //     jQuery(window).on('resize.cb.main orientationchange.cb.main', function () {
    //         clearTimeout(resizeTimeout);
    //
    //         resizeTimeout = setTimeout(function () {
    //             var hWindow     = jQuery(window).height();
    //             var hHeader     = lHeader.outerHeight() || 0;
    //             var hFooter     = lFooter.outerHeight() || 0;
    //
    //             // Set #main-container min height accordingly
    //             if (lPage.hasClass('page-header-fixed') || lPage.hasClass('page-header-glass')) {
    //                 lMain.css('min-height', hWindow - hFooter);
    //             } else {
    //                 lMain.css('min-height', hWindow - hHeader - hFooter);
    //             }
    //
    //             // Show footer's content
    //             lFooter.fadeTo(1000, 1);
    //         }, 150);
    //     }).triggerHandler('resize.cb.main');
    // }
    //
    // // Add 'side-trans-enabled' class to #page-container (enables sidebar and side overlay transition on open/close)
    // // Fixes IE10, IE11 and Edge bug in which animation was executed on each page load - really annoying!
    // lPage.addClass('side-trans-enabled');
  }

  // Handles header related classes
  static uiHandleHeader () {
    // // Unbind event in case it is already enabled
    // jQuery(window).off('scroll.cb.header');
    //
    // // If the header is fixed and has the glass style, add the related class on scrolling to add a background color to the header
    // if (lPage.hasClass('page-header-glass') && lPage.hasClass('page-header-fixed')) {
    //     jQuery(window).on('scroll.cb.header', function () {
    //         if (jQuery(this).scrollTop() > 60) {
    //             lPage.addClass('page-header-scroll');
    //         } else {
    //             lPage.removeClass('page-header-scroll');
    //         }
    //     }).trigger('scroll.cb.header');
    // }
  }

  // Main navigation functionality
  static uiHandleNav () {
    // // Unbind event in case it is already enabled
    // lPage.off('click.cb.menu');
    //
    // // When a submenu link is clicked
    // lPage.on('click.cb.menu', '[data-toggle="nav-submenu"]', function(e){
    //     // Get link
    //     var link = jQuery(this);
    //
    //     // Get link's parent
    //     var parentLi = link.parent('li');
    //
    //     if (parentLi.hasClass('open')) { // If submenu is open, close it..
    //         parentLi.removeClass('open');
    //     } else { // .. else if submenu is closed, close all other (same level) submenus first before open it
    //         link
    //             .closest('ul')
    //             .children('li')
    //             .removeClass('open');
    //
    //         parentLi
    //             .addClass('open');
    //     }
    //
    //     // Remove focus from submenu link
    //     if (lHtml.hasClass('no-focus')) {
    //         link.blur();
    //     }
    //
    //     return false;
    // });
  }

  /*
   ********************************************************************************************
   *
   * API
   *
   * Functions which handle requests for blocks and layout
   *
   *********************************************************************************************
   */

  // Layout API
  static uiApiLayout (mode) {
    // windowW = getWidth();
    //
    // // Mode selection
    // switch(mode) {
    //     case 'init':
    //         // Unbind event in case it is already enabled
    //         lPage.off('click.cb.layout');
    //
    //         // Call layout API on button click
    //         lPage.on('click.cb.layout', '[data-toggle="layout"]', function () {
    //             var el = jQuery(this);
    //
    //             uiApiLayout(el.data('action'));
    //
    //             if (lHtml.hasClass('no-focus')) {
    //                 el.blur();
    //             }
    //         });
    //         break;
    //     case 'sidebar_pos_toggle':
    //         lPage.toggleClass('sidebar-r');
    //         break;
    //     case 'sidebar_pos_left':
    //         lPage.removeClass('sidebar-r');
    //         break;
    //     case 'sidebar_pos_right':
    //         lPage.addClass('sidebar-r');
    //         break;
    //     case 'sidebar_toggle':
    //         if (windowW > 991) {
    //             lPage.toggleClass('sidebar-o');
    //         } else {
    //             lPage.toggleClass('sidebar-o-xs');
    //         }
    //         break;
    //     case 'sidebar_open':
    //         if (windowW > 991) {
    //             lPage.addClass('sidebar-o');
    //         } else {
    //             lPage.addClass('sidebar-o-xs');
    //         }
    //         break;
    //     case 'sidebar_close':
    //         if (windowW > 991) {
    //             lPage.removeClass('sidebar-o');
    //         } else {
    //             lPage.removeClass('sidebar-o-xs');
    //         }
    //         break;
    //     case 'sidebar_mini_toggle':
    //         if (windowW > 991) {
    //             lPage.toggleClass('sidebar-mini');
    //         }
    //         break;
    //     case 'sidebar_mini_on':
    //         if (windowW > 991) {
    //             lPage.addClass('sidebar-mini');
    //         }
    //         break;
    //     case 'sidebar_mini_off':
    //         if (windowW > 991) {
    //             lPage.removeClass('sidebar-mini');
    //         }
    //         break;
    //     case 'sidebar_style_inverse_toggle':
    //         lPage.toggleClass('sidebar-inverse');
    //         break;
    //     case 'sidebar_style_inverse_on':
    //         lPage.addClass('sidebar-inverse');
    //         break;
    //     case 'sidebar_style_inverse_off':
    //         lPage.removeClass('sidebar-inverse');
    //         break;
    //     case 'side_overlay_toggle':
    //        if (lPage.hasClass('side-overlay-o')) {
    //            uiApiLayout('side_overlay_close');
    //        } else {
    //            uiApiLayout('side_overlay_open');
    //        }
    //         break;
    //     case 'side_overlay_open':
    //         // When ESCAPE key is hit close the side overlay
    //         jQuery(document).on('keydown.cb.sideOverlay', function(e){
    //             if (e.which === 27) {
    //                 e.preventDefault();
    //                 uiApiLayout('side_overlay_close');
    //             }
    //         });
    //
    //         lPage.addClass('side-overlay-o');
    //         break;
    //     case 'side_overlay_close':
    //         // Unbind ESCAPE key
    //         jQuery(document).off('keydown.cb.sideOverlay');
    //
    //         lPage.removeClass('side-overlay-o');
    //         break;
    //     case 'side_overlay_hoverable_toggle':
    //         lPage.toggleClass('side-overlay-hover');
    //         break;
    //     case 'side_overlay_hoverable_on':
    //         lPage.addClass('side-overlay-hover');
    //         break;
    //     case 'side_overlay_hoverable_off':
    //         lPage.removeClass('side-overlay-hover');
    //         break;
    //     case 'header_fixed_toggle':
    //         lPage.toggleClass('page-header-fixed');
    //         uiHandleHeader();
    //         uiHandleMain();
    //         break;
    //     case 'header_fixed_on':
    //         lPage.addClass('page-header-fixed');
    //         uiHandleHeader();
    //         uiHandleMain();
    //         break;
    //     case 'header_fixed_off':
    //         lPage.removeClass('page-header-fixed');
    //         uiHandleHeader();
    //         uiHandleMain();
    //         break;
    //     case 'header_style_modern':
    //         lPage.removeClass('page-header-glass page-header-inverse').addClass('page-header-modern');
    //         uiHandleHeader();
    //         uiHandleMain();
    //         break;
    //     case 'header_style_classic':
    //         lPage.removeClass('page-header-glass page-header-modern');
    //         uiHandleHeader();
    //         uiHandleMain();
    //         break;
    //     case 'header_style_glass':
    //         lPage.removeClass('page-header-modern').addClass('page-header-glass');
    //         uiHandleHeader();
    //         uiHandleMain();
    //         break;
    //     case 'header_style_inverse_toggle':
    //         if (!lPage.hasClass('page-header-modern')) {
    //             lPage.toggleClass('page-header-inverse');
    //         }
    //         break;
    //     case 'header_style_inverse_on':
    //         if (!lPage.hasClass('page-header-modern')) {
    //             lPage.addClass('page-header-inverse');
    //         }
    //         break;
    //     case 'header_style_inverse_off':
    //         if (!lPage.hasClass('page-header-modern')) {
    //             lPage.removeClass('page-header-inverse');
    //         }
    //         break;
    //     case 'header_search_on':
    //         lHeaderSearch.addClass('show');
    //         lHeaderSearchInput.focus();
    //
    //         // When ESCAPE key is hit close the search section
    //         jQuery(document).on('keydown.cb.header.search', function(e){
    //             if (e.which === 27) {
    //                 e.preventDefault();
    //                 console.log('test');
    //                 uiApiLayout('header_search_off');
    //             }
    //         });
    //         break;
    //     case 'header_search_off':
    //         lHeaderSearch.removeClass('show');
    //         lHeaderSearchInput.blur();
    //
    //         // Unbind ESCAPE key
    //         jQuery(document).off('keydown.cb.header.search');
    //         break;
    //     case 'header_loader_on':
    //         lHeaderLoader.addClass('show');
    //         break;
    //     case 'header_loader_off':
    //         lHeaderLoader.removeClass('show');
    //         break;
    //     case 'side_scroll_toggle':
    //         lPage.toggleClass('side-scroll');
    //         uiHandleScroll();
    //         break;
    //     case 'side_scroll_on':
    //         lPage.addClass('side-scroll');
    //         uiHandleScroll();
    //         break;
    //     case 'side_scroll_off':
    //         lPage.removeClass('side-scroll');
    //         uiHandleScroll();
    //         break;
    //     case 'content_layout_toggle':
    //         if (lPage.hasClass('main-content-boxed')) {
    //             uiApiLayout('content_layout_narrow');
    //         } else if (lPage.hasClass('main-content-narrow')) {
    //             uiApiLayout('content_layout_full_width');
    //         } else {
    //             uiApiLayout('content_layout_boxed');
    //         }
    //         break;
    //     case 'content_layout_boxed':
    //         lPage.removeClass('main-content-narrow').addClass('main-content-boxed');
    //         break;
    //     case 'content_layout_narrow':
    //         lPage.removeClass('main-content-boxed').addClass('main-content-narrow');
    //         break;
    //     case 'content_layout_full_width':
    //         lPage.removeClass('main-content-boxed main-content-narrow');
    //     default:
    //         return false;
    // }
  }

  // Blocks API
  static uiApiBlocks (block, mode) {
    // Set default icons for fullscreen and content toggle buttons
    var iconFullscreen = 'si si-size-fullscreen'
    var iconFullscreenActive = 'si si-size-actual'
    var iconContent = 'si si-arrow-up'
    var iconContentActive = 'si si-arrow-down'

    if (mode === 'init') {
      // Auto add the default toggle icons to fullscreen and content toggle buttons
      // document.querySelectorAll('[data-toggle="block-option"][data-action="fullscreen_toggle"]').forEach(() => {
      // var el = this
      // el.innerHTML = '<i class="' + (el.closest('.block').hasClass('block-mode-fullscreen') ? iconFullscreenActive : iconFullscreen) + '"></i>'
      // })

      document.querySelectorAll('[data-toggle="block-option"][data-action="content_toggle"]').forEach(() => {
        var el = this
        el.innerHTML = '<i class="' + (el.closest('.block').hasClass('block-mode-hidden') ? iconContentActive : iconContent) + '"></i>'
      })

      var cbBlocksOptionEventListener = function () {
        this.uiApiBlocks(this.closest('.block'), this.dataset.action)
      }
      // Unbind event in case it is already enabled
      this.lPage.removeEventListener('click.cb.blocks', cbBlocksOptionEventListener)

      // Call blocks API on option button click
      this.lPage.on('click.cb.blocks', '[data-toggle="block-option"]', cbBlocksOptionEventListener)
    } else {
      // Get block element
      var elBlock = block

      // If element exists, procceed with blocks functionality
      if (elBlock.length) {
        // Get block option buttons if exist (need them to update their icons)
        var btnFullscreen = elBlock.querySelector('[data-toggle="block-option"][data-action="fullscreen_toggle"]')
        var btnContentToggle = elBlock.querySelector('[data-toggle="block-option"][data-action="content_toggle"]')

        // Mode selection
        switch (mode) {
          case 'fullscreen_toggle':
            console.log('here')
            elBlock.classList.remove('block-mode-pinned').toggle('block-mode-fullscreen')
            // Enable/disable scroll lock to block
            // if (elBlock.hasClass('block-mode-fullscreen')) {
            // jQuery(elBlock).scrollLock('enable');
            // } else {
            // jQuery(elBlock).scrollLock('disable');
            // }
            // Update block option icon
            if (btnFullscreen.length) {
              if (elBlock.hasClass('block-mode-fullscreen')) {
                btnFullscreen.querySelector('i').classList.remove(iconFullscreen).add(iconFullscreenActive)
              } else {
                btnFullscreen.querySelector('i').classList.remove(iconFullscreenActive).add(iconFullscreen)
              }
            }
            break
          // case 'fullscreen_on':
          //     elBlock.removeClass('block-mode-pinned').addClass('block-mode-fullscreen');
          //
          //     // Enable scroll lock to block
          //     jQuery(elBlock).scrollLock('enable');
          //
          //     // Update block option icon
          //     if (btnFullscreen.length) {
          //         jQuery('i', btnFullscreen)
          //             .removeClass(iconFullscreen)
          //             .addClass(iconFullscreenActive);
          //     }
          //     break;
          // case 'fullscreen_off':
          //     elBlock.removeClass('block-mode-fullscreen');
          //
          //     // Disable scroll lock to block
          //     jQuery(elBlock).scrollLock('disable');
          //
          //     // Update block option icon
          //     if (btnFullscreen.length) {
          //         jQuery('i', btnFullscreen)
          //             .removeClass(iconFullscreenActive)
          //             .addClass(iconFullscreen);
          //     }
          //     break;
          // case 'content_toggle':
          //     elBlock.toggleClass('block-mode-hidden');
          //
          //     // Update block option icon
          //     if (btnContentToggle.length) {
          //         if (elBlock.hasClass('block-mode-hidden')) {
          //             jQuery('i', btnContentToggle)
          //                 .removeClass(iconContent)
          //                 .addClass(iconContentActive);
          //         } else {
          //             jQuery('i', btnContentToggle)
          //                 .removeClass(iconContentActive)
          //                 .addClass(iconContent);
          //         }
          //     }
          //     break;
          // case 'content_hide':
          //     elBlock.addClass('block-mode-hidden');
          //
          //     // Update block option icon
          //     if (btnContentToggle.length) {
          //         jQuery('i', btnContentToggle)
          //             .removeClass(iconContent)
          //             .addClass(iconContentActive);
          //     }
          //     break;
          // case 'content_show':
          //     elBlock.removeClass('block-mode-hidden');
          //
          //     // Update block option icon
          //     if (btnContentToggle.length) {
          //         jQuery('i', btnContentToggle)
          //             .removeClass(iconContentActive)
          //             .addClass(iconContent);
          //     }
          //     break;
          // case 'state_toggle':
          //     elBlock.toggleClass('block-mode-loading');
          //
          //     // Return block to normal state if the demostration mode is on in the refresh option button - data-action-mode="demo"
          //     if (jQuery('[data-toggle="block-option"][data-action="state_toggle"][data-action-mode="demo"]', elBlock).length) {
          //         setTimeout(function () {
          //             elBlock.removeClass('block-mode-loading');
          //         }, 2000);
          //     }
          //     break;
          // case 'state_loading':
          //     elBlock.addClass('block-mode-loading');
          //     break;
          // case 'state_normal':
          //     elBlock.removeClass('block-mode-loading');
          //     break;
          // case 'pinned_toggle':
          //     elBlock.removeClass('block-mode-fullscreen').toggleClass('block-mode-pinned');
          //     break;
          // case 'pinned_on':
          //     elBlock.removeClass('block-mode-fullscreen').addClass('block-mode-pinned');
          //     break;
          // case 'pinned_off':
          //     elBlock.removeClass('block-mode-pinned');
          //     break;
          // case 'close':
          //     elBlock.hide();
          //     break;
          // case 'open':
          //     elBlock.show();
          //     break;
          default:
            return false
        }
      }
    }
  }

  /*
   ********************************************************************************************
   *
   * PRIVATE HELPERS
   *
   * Private helper functions
   *
   *********************************************************************************************
   */

  // Get window width
  static getWidth () {
    return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
  }

  /*
   ********************************************************************************************
   *
   * CORE HELPERS
   *
   * Third party plugin inits or various custom user interface helpers to extend functionality
   * They are called by default and can be used right away
   *
   *********************************************************************************************
   */

  // Manage page loading screen functionality
  static uiHelperCorePageLoader (mode, colorClass) {
    var lpageLoader = document.querySelector('#page-loader')

    if (mode === 'show') {
      if (lpageLoader) {
        if (colorClass) {
          lpageLoader.className = colorClass
        }
        lpageLoader.classList.add('show')
      } else {
        if (colorClass) {
          this.lBody.insertBefore('<div id="page-loader" class="show ' + colorClass + '"></div>', this.lBody.firstChild)
        } else {
          this.lBody.insertBefore('<div id="page-loader" class="show"></div>', this.lBody.firstChild)
        }
      }
    } else if (mode === 'hide') {
      if (lpageLoader) {
        lpageLoader.classList.remove('show')
      }
    }

    return false
  }

  /*
   ********************************************************************************************
   *
   * UI HELPERS (ON DEMAND)
   *
   * Third party plugin inits or various custom user interface helpers to extend functionality
   * They need to be called in a page to be initialized. They are included here to be easy to
   * init them on demand on multiple pages (usually repeated init code in common components)
   *
   ********************************************************************************************
   */

  /*
   * Print Page functionality
   *
   * Codebase.helper('print-page');
   *
   */
  static uiHelperPrint () {
    // Store all #page-container classes
    var pageCls = this.lPage.className

    // Remove all classes from #page-container
    this.lPage.className = ''

    // Print the page
    window.print()

    // Restore all #page-container classes
    this.lPage.className = pageCls
  }

  static init () {
    // LAYOUT VARIABLES
    this.uiInit()

    // BASE UI
    this.uiHandleScroll('init')
    this.uiHandleMain()
    this.uiHandleHeader()
    this.uiHandleNav()

    // API
    this.uiApiLayout('init')
    this.uiApiBlocks(false, 'init')

    // CORE HELPERS
    this.uiHelperCorePageLoader('hide')
  }

  static layout (mode) {
    this.uiApiLayout(mode)
  }

  static blocks (block, mode) {
    this.uiApiBlocks(block, mode)
  }

  static loader (mode, colorClass) {
    this.uiHelperCorePageLoader(mode, colorClass)
  }

  static helper (helper) {
    switch (helper) {
      case 'core-fn-uiInit':
        this.uiInit()
        break
      case 'core-fn-uiHandleScrollInit':
        this.uiHandleScroll('init')
        break
      case 'core-fn-uiHandleScroll':
        this.uiHandleScroll()
        break
      case 'core-fn-uiHandleMain':
        this.uiHandleMain()
        break
      case 'core-fn-uiHandleHeader':
        this.uiHandleHeader()
        break
      case 'core-fn-uiHandleNav':
        this.uiHandleNav()
        break
      case 'core-fn-uiApiLayout':
        this.uiApiLayout('init')
        break
      case 'core-fn-uiApiBlocks':
        this.uiApiBlocks(false, 'init')
        break
      case 'core-page-loader':
        this.uiHelperCorePageLoader('hide')
        break
      case 'print-page':
        this.uiHelperPrint()
        break
      default:
        return false
    }
  }

  static helpers (helpers) {
    if (helpers instanceof Array) {
      for (var index in helpers) {
        this.helper(helpers[index])
      }
    } else {
      this.helper(helpers)
    }
  }
}

var module = {
  install (Vue) {
    Hive.init()
    Vue.prototype.$Hive = Hive
    Vue.Hive = Hive
    Vue.prototype.$workspace = window.location.host.split('.')[0]
  }
}

export default module
