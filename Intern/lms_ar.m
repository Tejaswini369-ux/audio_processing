function lms_ar(N, u_init, mu,uniqueIdentifier)
    % N: Number of samples
    % u_init: Initial values of u [u(1), u(2)]
    % mu: Step size for LMS algorithm

    % Initialize random noise
    v = rand(N, 1);

    % Initialize u with given initial values
    u = zeros(N, 1);
    u(1) = u_init(1);
    u(2) = u_init(2);

    % Generate autoregressive process
    for i = 3:N
        u(i) = 0.75 * u(i-1) - 0.5 * u(i-2) + v(i);
    endfor

    % Calculate autocorrelation matrix R and cross-correlation vector p
    R = zeros(2, 2);
    p = zeros(2, 1);

    for i = 2:N
        x = [v(i); v(i-1)];
        R = R + x * x';
        p = p + x * u(i);
    endfor

    R = R / (N-1);
    p = p / (N-1);
    w_opt = R \ p;

    % Initialize LMS weights and error
    w_lms = zeros(2, N);
    e = zeros(N, 1);

    % LMS algorithm
    for i = 2:N
        e(i) = u(i) - w_lms(:, i-1)' * [v(i); v(i-1)];
        w_lms(:, i) = w_lms(:, i-1) + mu * [v(i); v(i-1)] * e(i);
    endfor

    % Plot mean square error
    figure(1)
    plot(e.^2);
    title('Mean Square Error vs Number of Iterations')
    xlabel('Number of Iterations')
    ylabel('Mean Square Error')
    saveas(gcf, sprintf('Outputs/comparision_%s.png', uniqueIdentifier));
    close(gcf);

    % Plot random walk of w1
    figure(2)
    plot(1:N, w_lms(1, :));
    hold on
    plot(1:N, ones(1, N) * w_opt(1))
    title('Random Walk of w1')
    xlabel('Number of Iterations')
    ylabel('w1')
    legend('Estimated w1', 'Optimal w1')
    saveas(gcf, sprintf('Outputs/random_walk_of_w1_%s.png', uniqueIdentifier));
    close(gcf);
    hold off

    % Plot random walk of w2
    figure(3)
    plot(1:N, w_lms(2, :));
    hold on
    plot(1:N, ones(1, N) * w_opt(2))
    title('Random Walk of w2')
    xlabel('Number of Iterations')
    ylabel('w2')
    legend('Estimated w2', 'Optimal w2')
    saveas(gcf, sprintf('Outputs/random_walk_of_w2_%s.png', uniqueIdentifier));
    close(gcf);
    hold off

endfunction
N = 500;
u_init = [0.5, 1];
mu = 0.1;
lms_ar(N, u_init, mu);
