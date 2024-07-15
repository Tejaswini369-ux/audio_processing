function adaptive_filter(n, mu, sigma_nu, a,uniqueIdentifier)
    w = zeros(1, 2000);
    mse = zeros(length(mu), n);
    A(1, 1:200) = -0.98;

    for l = 1:length(mu)
        weight_e_temp = zeros(100, n);
        temp = zeros(100, n);
        temp1 = zeros(100, 200);

        for k = 1:100
            u = zeros(1, n);
            nu = sigma_nu * randn(1, n);

            for i = 2:n
                u(i) = a * u(i - 1) + nu(i);
            endfor

            u = sqrt(1 / var(u)) * u;
            w_est = zeros(1, n + 1);
            e = zeros(1, n);

            for j = 2:n
                e(j) = u(j) - w_est(j) * u(j - 1);
                w_est(j + 1) = w_est(j) + mu(l) * u(j - 1) * e(j);
                weight_e_temp(k, j) = w_est(j);
                temp(k, j) = (weight_e_temp(k, j) - a)^2;
                temp1(k, j) = w_est(j);
            endfor
        endfor

        mse(l, :) = sum(temp) / 100;
        rndwalk = sum(temp1) / 100;
    endfor

    figure
    stem(1:n, u)
    title('Desired Output')
    xlabel('Number of Samples')
    ylabel('Magnitude')
    saveas(gcf, sprintf('Outputs/desired_output_%s.png', uniqueIdentifier));
    close(gcf);

    figure
    plot(1:n, mse(1, :), 'r')
    hold on
    plot(1:n, mse(2, :), 'g')
    plot(1:n, mse(3, :), 'b')
    title('Learning curve for different step sizes')
    xlabel('Number of adaptation cycles, n')
    ylabel('Mean square error')
    legend('mu=0.01', 'mu=0.05', 'mu=0.1')
    saveas(gcf, sprintf('Outputs/learning_curve_%s.png', uniqueIdentifier));
    close(gcf);

    figure
    plot(1:200, A, 'b')
    hold on
    plot(1:n, rndwalk, 'r')
    title('Random Walk behaviour')
    xlabel('Number of adaptation cycles, n')
    ylabel('Tap Weight')
    saveas(gcf, sprintf('Outputs/random_walk_%s.png', uniqueIdentifier));
    close(gcf);
endfunction

% Parameters
n = 200;
mu = [0.01 0.05 0.1];
sigma_nu = 0.1;
a = -0.98;

% Call the function
adaptive_filter(n, mu, sigma_nu, a)
