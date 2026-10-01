<?php
/**
 * Template Name: Cricket Live Scores Full-Width
 * Description: A full-width page template for live cricket scores, upcoming fixtures, and points table.
 */

get_header();
?>

<?php
$display_mode = get_option('cricpulse_display_mode', 'full_app');
$google_key = get_option('cricpulse_google_api_key', '');
$app_url = 'https://ais-pre-lpqxoewxjngaqxidjp7znm-67909262050.asia-east1.run.app';
if (!empty($google_key)) {
    $app_url = add_query_arg('apiKey', $google_key, $app_url);
}
?>

<main id="primary" class="site-main">
    <div class="cricpulse-container" style="padding-top: 24px;">
        <?php if ($display_mode === 'full_app') : ?>
            <div class="cricpulse-app-wrapper" style="width: 100%; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 35px rgba(0,0,0,0.5); background: #020617; margin: 15px 0;">
                <iframe src="<?php echo esc_url($app_url); ?>" style="width: 100%; height: 950px; border: none; display: block;" allow="autoplay; clipboard-write; microphone" loading="lazy" title="CricPulse Live Cricket"></iframe>
            </div>
        <?php else : ?>
            <div id="cp-live-root"></div>
        <?php endif; ?>
    </div>
</main>

<?php
get_footer();
