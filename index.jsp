<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
	<title>Regex on ML</title>
	<link href="css/font-open-sans/open-sans.css" rel="stylesheet" type="text/css">
	<link href="css/main.1436803526.css" rel="stylesheet" type="text/css">
	<link type="text/plain" rel="author" href="//regex101.com/humans.txt">
	<link rel="icon" href="/favicon.ico" type="image/x-icon">
	<link href="css/font-awesome/css/font-awesome.min.css" rel="stylesheet">
	<meta charset="ISO-8859-1">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
	<meta name="keywords" content="javascript,regex,regular expression,debugger,explainer,helper,tester,match,pcre,python,editor">
	<meta name="description" content="Online regex tester, debugger with highlighting for PHP, PCRE, Python and JavaScript.">
	<meta name="author" content="Firas Dib">
	<meta property="twitter:card" content="summary">
	<meta property="twitter:site" content="@regex101">
	<meta property="twitter:title" content="Regex101 - online regex editor and debugger">
	<meta property="twitter:description" content="Regex101 allows you to create, debug, test and have your expressions explained for PHP, PCRE, JavaScript and Python. The website also features a community where you can share useful expressions.">
	<meta property="twitter:creator" content="@regex101">
	<meta property="twitter:image" content="//regex101.com/gfx/preview.png">
	<meta property="twitter:domain" content="regex101.com">
</head>
<body class="box_overflow_fix light default" spellcheck="false">
	<div id="header_parent">
		<div id="header">
			<div id="header_menu">
				<a target="_blank" href="https://twitter.com/regex101"><i class="fa fa-twitter-square "></i><span class="large_menu">RegEx101</span></a>
				<a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=firas%2edib%40gmail%2ecom&amp;lc=US&amp;item_name=Regex101&amp;no_note=0&amp;currency_code=USD&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest"><i class="fa fa-dollar"></i><span class="large_menu">Donate</span></a>
				<a target="_blank" href="mailto:contact@regex101.com"><i class="fa fa-send"></i><span class="large_menu">Contact</span></a>
				<a target="_blank" href="https://github.com/firasdib/Regex101/issues"><i class="fa fa-exclamation-triangle"></i><span class="large_menu">Bug reports &amp; Suggestions</span></a>
				<div id="settings_popup">
					<span class="fa-stack fa-lg" id="settings" title="Adjust settings and theme">
					 	<i class="fa fa-circle fa-stack-2x"></i>
						<i class="fa fa-wrench fa-stack-1x"></i>
					</span>
					<span class="fa-stack fa-lg" id="sign_in_out" title="Sign in" style="display: none">
						<i class="fa fa-circle fa-stack-2x"></i>
						<i class="fa fa-sign-in fa-stack-1x"></i>
					</span>
				</div>

			</div>
			<div class="text_overflow">
				<h1 id="logo">
					<a href="/">
						<div id="large_header"><span class="part1">reg</span> <span class="part2">ex</span> <span class="part3">101</span> <span class="part3">(Mirror Site)</span></div>
						<div id="small_header"><span class="part1">reg</span><span class="part2">ex</span> <span class="part3">101</span></div>
					</a>
				</h1>
				<ul id="header_nav">
					<li class="fullscreen header_nav active main_menu main" data-id="40">
						<i class="fa fa-terminal"></i><span class="large_menu">Regex Tester</span>
					</li>
					<li class="fullscreen header_nav main_menu community" data-id="43" >
						<i class="fa fa-cloud"></i><span class="large_menu">Regex Library</span>
					</li>
					<li class="fullscreen header_nav main_menu" data-id="42" style="display: none">
						<a target="_blank" href="http://webchat.freenode.net/?nick=regex101-....&amp;channels=regex" id="irc">
							<i class="fa fa-comments"></i><span class="large_menu">IRC</span>
						</a>
					</li>
									</ul>
			</div>
		</div>
	</div>
	<div id="settings_popup_contents">
		<div class="left">
			<div class="label"><i class="fa fa-gear settings"></i> General Settings</div>
			<input type="checkbox" id="display_whitespace" name="display_whitespace" tabindex="999" value="1" data-id="1">
			<label class="design_label" for="display_whitespace">
				<span></span>Display Whitespace
			</label>
			<input type="checkbox" id="small_menu" name="small_menu" tabindex="999" value="1" data-id="201">
			<label class="design_label" for="small_menu">
				<span></span>Use minimal view
			</label>
			<div class="label"><i class="fa fa-picture-o theme"></i> Theme</div>
			<input type="radio" id="light_theme" name="theme" tabindex="999" value="1" data-id="203" checked="checked">
			<label class="design_label" for="light_theme">
				<span></span>Use light theme
			</label>
			<input type="radio" id="dark_theme" name="theme" tabindex="999" value="1" data-id="200">
			<label class="design_label" for="dark_theme">
				<span></span>Use dark theme
			</label>
		</div>
		<div class="right">
			<div id="colorizer_themes">
				<div class="label"><i class="fa fa-terminal regex"></i> Regex Settings</div>
				<input type="checkbox" id="colorize_regex" name="colorize_regex" tabindex="999" value="1" data-id="9">
				<label class="design_label" for="colorize_regex">
					<span></span>Colorize syntax
				</label>
				<div class="select_themes">
					<strong>Theme:</strong>
					<select class="light_themes" data-id="999">
						<option value="default">Default</option>
						<option value="default_light">Default - Light</option>
					</select><select class="dark_themes" data-id="999">
						<option value="default">Default</option>
					</select>
				</div>

				<input type="checkbox" id="smart_completion" name="smart_completion" tabindex="999" value="1" data-id="210">
				<label class="design_label" for="smart_completion">
					<span></span>Enable smart auto-completion
				</label>
				<input type="checkbox" id="wrap_newlines" name="wrap_newlines" tabindex="999" value="1" data-id="10">
				<label class="design_label" for="wrap_newlines">
					<span></span>Wrap long lines
				</label>
				<input type="checkbox" id="highlight_interaction" name="highlight_interaction" tabindex="999" value="0" data-id="220">
				<label class="design_label" for="highlight_interaction">
					<span></span>Highlight groups
				</label>
				<input type="checkbox" id="display_nonpart" name="display_nonpart" tabindex="999" value="0" data-id="221">
				<label class="design_label" for="display_nonpart">
					<span></span>Show non-participating groups
				</label>
				<div class="execution_limit">
					<label class="design_label" for="execution_limit">Max execution time:</label>
					<input type="text" name="execution_limit" id="execution_limit" placeholder="2000"><em>ms</em>
				</div>
			</div>
			<!--li id="dark_theme" data-id="200" class="menu_item">
				<i class="fa fa-picture-o"></i><span class="large_menu">Use dark theme</span>
			</li-->
		</div>
		<div class="arrow-box-tip reverse"></div>
	</div>
	<div class="denial_of_service" id="splash">
		<div>
			Initializing editor, please stand by... <i class="fa fa-cog fa-spin"></i>
		</div>
	</div>
	<div class="denial_of_service" id="loading_screen">
		<div>
			Loading content, please hold... <i class="fa fa-cog fa-spin"></i>
		</div>
	</div>

	<noscript>
		<div class="denial_of_service">
			<div>
				It seems like you have JavaScript disabled, rendering this website virtually useless.
				Please enable JavaScript to use this service. If you don't know how, try <a href="http://enable-javascript.com/">this</a>.
			</div>
		</div>
	</noscript>
	<div class="denial_of_service" id="old_browser">
		<div>You seem to be using an outdated version of your browser which is no longer supported by <strong>regex101.com</strong>. It is highly recommended that you upgrade your browser. Sorry for the inconvenience.</div>
	</div>
<div id="inline_menu" class="box_overflow_fix general_menu">
	<ul class="first-ul overflow_handler">
		<li class="regex_menu extension_menu share_menu" style="display: none">
			<ul>
				<li class="menu_notice">Save &amp; Share</li>
				<li id="permalink_menu" class="menu_item disabled" data-id="3" data-permalink="" data-version="">
					<i class="fa fa-save"></i><span class="large_menu">Save Regex (CTRL+S)</span>
				</li>
				<li id="permalink_fork" class="menu_item" data-id="900" style="display: none;">
					<i class="fa fa-code-fork"></i><span class="large_menu">Fork Regex</span>
				</li>
				<li class="menu_item unique disabled" data-id="4" id="community_submit">
					<i class="fa fa-cloud-upload"></i><span class="large_menu">Add to Regex Library</span>
				</li>
			</ul>
		</li>
		<li class="regex_menu extension_menu no_top_space">
			<ul>
				<li class="menu_notice">Flavor</li>
				<li class="flavor_pcre menu_item active" data-id="20">
					<span class="mini_menu">PCRE</span>
					<span class="large_menu"><i class="fa fa-file"></i>PCRE (PHP)</span>
				</li>
				<li class="flavor_js menu_item " data-id="21">
					<span class="mini_menu">JS</span>
					<span class="large_menu"><i class="fa fa-file"></i>JavaScript</span>
				</li>
				<li class="flavor_python menu_item " data-id="22">
					<span class="mini_menu">PY</span>
					<span class="large_menu"><i class="fa fa-file"></i>Python</span>
				</li>
			</ul>
		</li>
		<li class="regex_menu extension_menu" id="tools_menu">
			<ul>
				<li class="menu_notice">Tools</li>
				<li class="menu_item" data-id="50" id="format_regex">
					<i class="fa fa-indent"></i><span class="large_menu">Format Regex (requires free-spacing, /x)</span>
				</li>
				<li class="menu_item unique fullscreen disabled menu_toggle" data-id="8" id="sample_menu">
					<i class="fa fa-code"></i><span class="large_menu">Code Generator</span>
				</li>
				<li class="menu_item unique disabled fullscreen menu_toggle" data-id="7" id="debugger_menu">
					<i class="fa fa-bug"></i><span class="large_menu">Regex Debugger</span>
				</li>
				<li class="menu_item menu_toggle" data-id="99" id="unit_tests">
					<i class="fa fa-check"></i><span class="large_menu"><span class="unit_test_player"><i class="fa fa-play run_tests" title="Run tests (CTRL+K)"></i><span class="unit_result">n/a</span><span class="unit_progress"></span></span><span class="text_overflow">Unit tests</span></span>
				</li>
			</ul>
		</li>
		<li id="filter_menu" class="extension_menu community_menu no_top_space">
			<ul>
				<li class="menu_notice">Filter flavors</li>
				<li class="flavor_pcre menu_item active" data-id="100" data-flavor-id="1">
					<span class="mini_menu">PCRE</span>
					<span class="large_menu"><i class="fa fa-file"></i>PCRE (PHP)</span>
				</li>
				<li class="flavor_js menu_item active" data-id="101" data-flavor-id="2">
					<span class="mini_menu">JS</span>
					<span class="large_menu"><i class="fa fa-file"></i>JavaScript</span>
				</li>
				<li class="flavor_python menu_item active" data-id="102" data-flavor-id="3">
					<span class="mini_menu">PY</span>
					<span class="large_menu"><i class="fa fa-file"></i>Python</span>
				</li>
			</ul>
		</li>
		<li class="account_submenu extension_menu">
			<ul>
				<li class="menu_notice">Filter type</li>
				<li class="menu_item active" data-id="300" id="only_fav"><i class="fa fa-star"></i><span class="large_menu">View favorites</span></li>
				<li class="menu_item active" data-id="301" id="only_contrib"><i class="fa fa-bookmark-o"></i><span class="large_menu">View contributions</span></li>
			</ul>
		</li>
		<li class="donate_submenu extension_menu">
			<ul>
				<li class="menu_item"><a target="_blank" href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&amp;business=firas%2edib%40gmail%2ecom&amp;lc=US&amp;item_name=Regex101&amp;no_note=0&amp;currency_code=USD&amp;bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHostedGuest"><i class="fa-dollar fa"></i><span class="large_menu" data-txt="Thank you!">Consider a donation</span></a></li>
			</ul>
		</li>
	</ul>
</div>
<div id="content">
	<div id="community" class="box_overflow_fix extension_window"></div>
	<div id="account" class="box_overflow_fix extension_window"></div>

	<div id="regex_editor" class="box_overflow_fix">
		<div id="code_samples" class="extension_window box_overflow_fix overflow_handler"></div>


		<div id="regex_debugger" class="box_overflow_fix extension_window">
			<div id="regex_debugger_bg" class="box_overflow_fix">
				<div class="label" id="debugger_label">Status: Fetching debug info...</div>

				<div id="label_container" class="monospace">
					<input type="checkbox" id="show_regex_pos" name="show_regex_pos" tabindex="999" value="1" checked="checked"/>
					<label class="design_label" for="show_regex_pos">
						<span></span>Display position in pattern
					</label>

					<input type="checkbox" id="internal_opt" name="internal_opt" tabindex="999" value="1"/>
					<label class="design_label" for="internal_opt">
						<span></span>Disable internal engine optimizations
					</label>

					<a href="#" id="debugger_collapse">collapse all</a>
				</div>

			</div>
			<div id="regex_debugger_window" class="overflow_handler">
				<div class="debugger_loader_padding"></div>
			</div>
		</div>


		<div id="main_editor" class="flex-container box_overflow_fix">
			<div id="regex_container" class="flex-regex box_overflow_fix">
				<label for="regex">
					Regular Expression
					<div id="version_container" style="display: none;">
						&mdash;
						<select id="version_selector">
													</select>
											</div>
					<span id="result_indicator" class="no_match">no match</span>
				</label>

				<div id="regex_input" class="box_overflow_fix richtext_parent">
					<div id="delimiter_selector" class="richtext_left slash_menu slash box_overflow_fix" data-dropdown=".delimiter-dropdown">/</div>
					<div class="richtext_right">
						<div class="slash slash_menu" data-dropdown=".delimiter-dropdown">/</div><!--
						--><div id="options_container">
							<input data-focus="#options_container" value="" id="options" name="options" size="20" tabindex="2" type="text" placeholder="gmixXsuUAJ"/>
							<i id="options_helper" class="fa fa-question-circle"></i>
						</div>
						<div id="options_helper_contents"></div>
					</div>
					<div class="richtext_padding">
						<div class="richtext_container" id="richtext_regex_container">
							<div class="richtext" id="richtext_regex">
								<pre><span class="colorizer_height"></span><br/></pre>
								<pre id="regex_colors"><span></span><br/></pre>
								<textarea data-focus="#richtext_regex_container" spellcheck="false" id="regex" name="regex" tabindex="1" rows="1" cols="50" placeholder="insert your regular expression here" autofocus="autofocus"></textarea>
							</div>
						</div>
					</div>
				</div>
			</div>


			<div id="test_result_container" class="box_overflow_fix flex-text ">
				<label for="regex_string">Test string</label>
				<div class="overflow_handler flex-grow">
					<div class="richtext" id="richtext_test">
						<pre><span id="richtext_test_size"></span><br>&nbsp;</pre>
						<pre id="richtext_test_colors"><span id="test_color_element"></span><br></pre>
						<textarea wrap="off" data-focus="#test_result_container .overflow_handler" spellcheck="false" id="regex_string" class="box_overflow_fix" name="test" rows="10" tabindex="3" placeholder="insert your test string here"></textarea>
					</div>
				</div>
			</div>

			<div id="subst_parent" class="box_overflow_fix flex-sub ">
				<label for="sub" class="expander collapsed">
					<span class="fa fa-plus-circle"></span>Substitution
				</label>
				<div id="subst_container" class="overflow_handler flex-grow">
					<input class="box_overflow_fix" value="" id="sub" name="sub" tabindex="3" type="text" placeholder="substitution; \num = backreference, \n = newline, \t = tab">
					<div id="subst_area" class="overflow_handler flex-grow">
						<div contenteditable="true" id="subst_result" class="monospace hard_break box_overflow_fix"></div>
					</div>
				</div>
			</div>

			<div id="unit_tests_builder" class="box_overflow_fix flex-unit-builder">
				<div class="label">Create test<div class="right"><a href="#" class="button" tabindex="23">Add test</a></div></div>
				<div id="unit_test_creator" class="box_overflow_fix">
					<div class="test_builder">
						<div class="the_test pt1">
							<div class="left">given the string</div>
							<div class="right"><textarea tabindex="19" class="box_overflow_fix" id="unit_data" placeholder="test string"></textarea></div>
						</div>
						<div class="the_test pt2">
							<div class="left"><span>assert that</span><select id="unit_type" tabindex="20"></select><select tabindex="21" id="assert_type"></select></div>
							<div class="right"><textarea tabindex="22" class="box_overflow_fix" id="assert_equals" type="text" placeholder="string value"></textarea></div>
						</div>
					</div>
				</div>
			</div>
			<div id="unit_tests_list" class="box_overflow_fix flex-unit-list">
				<div class="label">Test list<div class="right unit_test_player"><i class="fa fa-play run_tests" title="Run tests (CTRL+K)"></i><span class="unit_result">n/a</span></div></div>
				<div id="unit_test_window" class="unit_test_window flex-grow overflow_handler">
					<div class="all_tests">
						<div id="unit_test_container">
													</div>
					</div>
				</div>
			</div>


		</div>


		<div id="regex_treeview" class="box_overflow_fix">
			<div id="treeview_resizer" title="Keep dragging"><div></div></div>
			<div id="treeview_content" class="box_overflow_fix flex-container">
			<div id="scroll_treeview" class="box_overflow_fix flex-elem">

				<div id="explainer_label" class="label expander">
					<span class="fa"></span>Explanation
				</div>
				<div class="overflow_handler box_overflow_fix flex-grow">
					<div id="treeview" style="height: 100%">
						An explanation of your regex will be automatically generated as you type.
					</div>
				</div>

			</div>
			<div id="scroll_match" class="box_overflow_fix flex-elem">

				<div id="match_label" class="label expander">
					<span class="fa"></span>Match information
				</div>
				<div class="overflow_handler box_overflow_fix flex-grow">
					<div id="match_info">
						Detailed match information will be displayed here automatically.
					</div>
				</div>

			</div>


			<div id="quickref" class="box_overflow_fix flex-elem">
				<div class="label expander">
					<span class="fa"></span>Quick reference
				</div>
				<div id="quickref_data" class="flex-grow">
					<div id="first_menu" class="box_overflow_fix general_menu">
						<ul>
							<li class="menu_notice">
								<div class="filter_input filter_mini box_overflow_fix" id="quickref_filter_parent">
									<i class="fa fa-search"></i>
									<div class="filter_div">
										<input data-focus="#quickref_filter_parent" type="text" id="quickref_filter" class="filter_parent box_overflow_fix" name="quickref_filter" value="" placeholder="filter">
									</div>
								</div>
								<span class="text_overflow" style="margin-right: 5px;">Full reference</span>
							</li>
							<li class="menu_item" data-id="basic"><i class="fa fa-star"></i>Most used tokens</li>
							<li class="menu_item" data-id="fullref"><i class="fa fa-database"></i>All tokens</li>
							<li class="menu_notice">Categories</li>
							<li class="menu_item" data-id="other"><i class="fa fa-dot-circle-o"></i>General tokens</li>
							<li class="menu_item" data-id="anchors"><i class="fa fa-anchor"></i>Anchors</li>
							<li class="menu_item" data-id="meta"><i class="fa fa-bolt"></i>Meta sequences</li>
							<li class="menu_item" data-id="quantifiers"><i class="fa fa-asterisk"></i>Quantifiers</li>
							<li class="menu_item" data-id="groups"><i class="fa fa-dot-circle-o"></i>Group constructs</li>
							<li class="menu_item" data-id="charclass"><i class="fa fa-th-large"></i>Character classes</li>
							<li class="menu_item" data-id="modifiers"><i class="fa fa-flag"></i>Flags/Modifiers</li>
							<li class="menu_item" data-id="subst"><i class="fa fa-scissors"></i>Substitution</li>
							<li class="menu_item" id="quickref_search"><i class="fa fa-search"></i>Search result</li>
						</ul>
					</div>
					<div id="second_menu" class="no_icon box_overflow_fix general_menu overflow_handler">
						<ul class="no_icon"></ul>
					</div>
				</div>
			</div>

			</div>
		</div>


	</div>
</div>

		<div class="delimiter-dropdown dropdown dropdown-relative dropdown-tip dropdown-index">
			<ul class="dropdown-menu">
				<li><a href="#">/</a></li>
				<li><a href="#">~</a></li>
				<li><a href="#">@</a></li>
				<li><a href="#">;</a></li>
				<li><a href="#">&#37;</a></li>
				<li><a href="#">`</a></li>
			</ul>
		</div>
<div id="dimmer"></div>
<div id="dimmer-popup"></div>
<div id="match-tooltip" class="arrow-box monospace">
	<div id="tooltip-contents"></div>
	<div id="match-tooltip-tip" class="arrow-box-tip"></div>
</div>

<script src="js/underscore-min.1436803505.js" type="text/javascript"></script>
<script src="js/jquery.min.js" type="text/javascript"></script>
<script src="js/jquery.tools.1436803505.js" type="text/javascript"></script>
<script src="js/general.regex101.1436803508.js" type="text/javascript"></script>
<script src="js/colorParser.regex101.1436803520.js" type="text/javascript"></script>
<script src="js/explainer.regex101.1436803512.js" type="text/javascript"></script>
<script src="js/common.regex101.1436803517.js" type="text/javascript"></script>
<script src="js/matcher.regex101.1436803513.js" type="text/javascript"></script>
</body>

</html>