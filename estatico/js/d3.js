"use strict";

// Update sidebar search to call d3 servers
jsonSearchHandlerUrl = window.jsonSearchHandlerUrl + "/d3";

$(function() {
	D3.initialize();
});

var D3 = {

	gem: $('#chat-gem'),
	gemCallback: null,
	skull: $('#skull-eyes'),
	skullCallback: null,

	initialize: function() {
		D3.gem.click(D3.activateGem);
		D3.skull.click(D3.activateSkull);

		D3.Tooltips.init();
	},

	activateGem: function() {
		D3.gem.toggleClass('activated');

		if (Core.isCallback(D3.gemCallback)) {
			D3.gemCallback();
		}
	},

	activateSkull: function() {
		D3.skull.toggleClass('activated');

		if (Core.isCallback(D3.skullCallback)) {
			D3.skullCallback();
		}
	},

	initClosableAlertBox: function(id) {
		Core.showUntilClosed('#' + id, id);
			}

};

D3.Icons = {

	getRuneIcon: function(type, size) {
		var icon = document.createElement('span');
			icon.className = 'd3-icon d3-icon-rune d3-icon-rune-' + size;
			icon.innerHTML = '<span class="rune-' + type + '"></span>';

		return icon;
	},

	getSkillUrl: function(name, size) {
		return Core.cdnUrl + '/d3/icons/skills/' + size + '/' + name + '.png';
	},

	getItemUrl: function(name, size, slug, gender) {
		if (slug)
			slug = slug.replace('-', '');

		return Core.cdnUrl + '/d3/icons/items/' + size + '/' + name + '_' + (slug || 'demonhunter') + '_' + (gender || 'male') + '.png';
	},

	getPortraitUrl: function(name, size) {
		return Core.cdnUrl + '/d3/icons/portraits/' + size + '/' + name + '.png';
	}

};

D3.Tooltips = { // Reminder: Keep in sync with the equivalent code in tooltips.js

	TYPES: {
		item: {
			type: 'item',
			url: 'item/{key}'
		},
		recipe: {
			type: 'recipe',
			url: 'recipe/{key}'
		},
		skill: {
			type: 'skill',
			url: 'skill/{folder}/{key}'
		},
		calculator: {
			type: 'calculator',
			url: 'calculator/{folder}/{key}'
		}
	},

	URL_PATTERN_BASE: new RegExp('/d3/([a-z]{2})/(.+)'),

	URL_PATTERNS: [
		/*
		Notes:
			- Using [^#\\?]+ below to ignore URL parameters or hashes
		*/

		// item/{itemSlug}
		{
			regex: new RegExp('^item/()([^#\\?]+)$'),
			params: {
				type: 'item'
			}
		},
		// artisan/{artisanSlug}/recipe/{recipeSlug}
		{
			regex: new RegExp('^artisan/([^/]+)/recipe/([^#\\?]+)$'),
			params: {
				type: 'recipe'
			}
		},
		// class/{classSlug}/active/{skillSlug}
		{
			regex: new RegExp('^class/([^/]+)/active/([^#\\?]+)$'),
			params: {
				type: 'skill'
			}
		},
		// class/{classSlug}/passive/{skillSlug}
		{
			regex: new RegExp('^class/([^/]+)/passive/([^#\\?]+)$'),
			params: {
				type: 'skill'
			}
		},
		// follower/{followerSlug}/skill/{skillSlug}
		{
			regex: new RegExp('^follower/([^/]+)/skill/([^#]+)'),
			params: {
				type: 'skill'
			}
		},
		// calculator/{classSlug}#{build}
		{
			regex: new RegExp('^calculator/([^#]+)[#/](.+)'),
			params: {
				type: 'calculator'
			}
		}
	],

	init: function() {

		// data-d3tooltip
		Tooltip.factory('[data-d3tooltip]', {
			ajax: true,
			onShow: function(event) {
				var node = event.currentTarget;

				if (node.rel === 'np') {
					return;
				}

				node = $(node);

				D3.Tooltips.show(node, Core.baseUrl + '/tooltip/' + node.data('d3tooltip'))
			},
			key: "data-d3tooltip"
		});

		// Automatic tooltips for links across the site
		Tooltip.factory('a', {
			onShow: function(event) {

				var node = event.currentTarget;

				if (node.rel == 'np' || node.getAttribute('data-d3tooltip') || node.getAttribute('data-tooltip')) {
					return;
				}

				D3.Tooltips.show($(node), D3.Tooltips.parseUrl(node));
			}
		});
	},

	parseUrl: function(link) {
		if (link.href.indexOf(location.host) == -1) { // Must be a link to the current domain
			return;
		}

		// Use getAttribute() so that it pulls in the raw value
		// Pass 2 as a flag so that IE doesn't return a full path
		if (!link.getAttribute('href', 2).match(D3.Tooltips.URL_PATTERN_BASE)) {
			return;
		}

		var locale = RegExp.$1;
		var rest = RegExp.$2;

		for(var i = 0; i < D3.Tooltips.URL_PATTERNS.length; ++i) {

			var urlPattern = D3.Tooltips.URL_PATTERNS[i];

			if(!rest.match(urlPattern.regex)) {
				continue;
			}

			var folder = RegExp.$1;
			var key = RegExp.$2;

			if(folder.indexOf('/') != -1 || key.indexOf('/') != -1) { // Folder and key shouldn't contain any slashes
				continue;
			}

			var tooltipType = D3.Tooltips.TYPES[urlPattern.params.type];

			var url = tooltipType.url
				.replace('{folder}', folder)
				.replace('{key}',    key);

			return Core.projectUrl + '/' + locale + '/tooltip/' + url;
		}
	},

	show: function(node, url) {

		if(!url) {
			return;
		}

		Tooltip.show(node, url, {
			ajax: true,
			className: 'ui-tooltip-d3',
			useBaseUrl: false
		});
	}

};

var Nickname = {

	/**
	 * Attempt to create the nickname.
	 */
	create: function() {
		var nickname = $('#nickname-field').val(),
			error = $('#nickname-error');

		error.fadeOut();

		$.ajax({
			url: Core.baseUrl +'/nickname/create',
			data: {
				nickname: nickname
			},
			type: 'POST',
			dataType: 'json',
			success: function(response) {
				if (response.error) {
					error.html(response.error).fadeIn();
				} else {
					location.reload(true);
				}
			}
		});
	},

	/**
	 * Toggle form button based on input value.
	 *
	 * @param input
	 */
	listen: function(input) {
		var button = $('#nickname-button');

		if ($.trim(input.value) != '')
			button.removeClass('disabled').removeAttr('disabled');
		else
			button.addClass('disabled').attr('disabled', 'disabled');
	},

	/**
	 * Open up the nickname creation window.
	 */
	open: function() {
		$.ajax({
			url: Core.baseUrl +'/nickname/',
			dataType: 'html',
			success: function(response) {
				Overlay.open(response, {
					className: 'create-nickname'
				});

				$('#nickname-field').keyup(function(e) {
					return Nickname.listen(this);
				});
			}
		});
	}

};

// overwrite Login.open() to remove embedded login
$(function() {
	Login.open = function() {
		window.location = "?login";
	};
});
